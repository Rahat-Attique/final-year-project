// Copyright 2006 The Closure Library Authors. All Rights Reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS-IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

goog.provide('goog.eventsTest');
goog.setTestOnly('goog.eventsTest');

goog.require('goog.asserts.AssertionError');
goog.require('goog.debug.EntryPointMonitor');
goog.require('goog.debug.ErrorHandler');
goog.require('goog.debug.entryPointRegistry');
goog.require('goog.dom');
goog.require('goog.dom.TagName');
goog.require('goog.events');
goog.require('goog.events.BrowserFeature');
goog.require('goog.events.CaptureSimulationMode');
goog.require('goog.events.Event');
goog.require('goog.events.EventTarget');
goog.require('goog.events.EventType');
goog.require('goog.events.Listener');
goog.require('goog.functions');
goog.require('goog.testing.PropertyReplacer');
goog.require('goog.testing.jsunit');
goog.require('goog.testing.recordFunction');

const originalHandleBrowserEvent = goog.events.handleBrowserEvent_;
let propertyReplacer;
let et1;
let et2;
let et3;

function setUp() {
  et1 = new goog.events.EventTarget();
  et2 = new goog.events.EventTarget();
  et3 = new goog.events.EventTarget();
  propertyReplacer = new goog.testing.PropertyReplacer();
}

function tearDown() {
  goog.events.CAPTURE_SIMULATION_MODE = goog.events.CaptureSimulationMode.ON;
  goog.events.handleBrowserEvent_ = originalHandleBrowserEvent;
  goog.disposeAll(et1, et2, et3);
  goog.events.removeAll(document.body);
  propertyReplacer.reset();
}

function testProtectBrowserEventEntryPoint() {
  const errorHandlerFn = goog.testing.recordFunction();
  const errorHandler = new goog.debug.ErrorHandler(errorHandlerFn);

  goog.events.protectBrowserEventEntryPoint(errorHandler);

  const browserEventHandler =
      goog.testing.recordFunction(goog.events.handleBrowserEvent_);
  goog.events.handleBrowserEvent_ = function() {
    try {
      browserEventHandler.apply(this, arguments);
    } catch (e) {
      // Ignored.
    }
  };

  const err = Error('test');
  const body = document.body;
  goog.events.listen(
      body, goog.events.EventType.CLICK, function() { throw err; });

  dispatchClick(body);

  assertEquals(
      'Error handler callback should be called.', 1,
      errorHandlerFn.getCallCount());
  assertEquals(err, errorHandlerFn.getLastCall().getArgument(0));

  assertEquals(1, browserEventHandler.getCallCount());
  const err2 = browserEventHandler.getLastCall().getError();
  assertNotNull(err2);
  assertTrue(err2 instanceof goog.debug.ErrorHandler.ProtectedFunctionError);
}

function testSelfRemove() {
  const callback = function() {
    // This listener removes itself during event dispatching, so it
    // is marked as 'removed' but not actually removed until after event
    // dispatching ends.
    goog.events.removeAll(et1, 'click');

    // Test that goog.events.getListener ignores events marked as 'removed'.
    assertNull(goog.events.getListener(et1, 'click', callback));
  };
  goog.events.listen(et1, 'click', callback);
  goog.events.dispatchEvent(et1, 'click');
}

function testMediaQueryList() {
  if (!window.matchMedia) return;

  const mql = window.matchMedia('(max-width: 640px)');
  const key = goog.events.listen(mql, 'change', goog.nullFunction);

  // I don't know of any way to make it raise an event in a test.

  goog.events.unlistenByKey(key);
}

function testHasListener() {
  const div = goog.dom.createElement(goog.dom.TagName.DIV);
  assertFalse(goog.events.hasListener(div));

  const key = goog.events.listen(div, 'click', function() {});
  assertTrue(goog.events.hasListener(div));
  assertTrue(goog.events.hasListener(div, 'click'));
  assertTrue(goog.events.hasListener(div, 'click', false));
  assertTrue(goog.events.hasListener(div, undefined, false));

  assertFalse(goog.events.hasListener(div, 'click', true));
  assertFalse(goog.events.hasListener(div, undefined, true));
  assertFalse(goog.events.hasListener(div, 'mouseup'));

  // Test that hasListener returns false when all listeners are removed.
  goog.events.unlistenByKey(key);
  assertFalse(goog.events.hasListener(div));
}

function testHasListenerWithEventTarget() {
  assertFalse(goog.events.hasListener(et1));

  function callback() {}
  goog.events.listen(et1, 'test', callback, true);
  assertTrue(goog.events.hasListener(et1));
  assertTrue(goog.events.hasListener(et1, 'test'));
  assertTrue(goog.events.hasListener(et1, 'test', true));
  assertTrue(goog.events.hasListener(et1, undefined, true));

  assertFalse(goog.events.hasListener(et1, 'click'));
  assertFalse(goog.events.hasListener(et1, 'test', false));

  goog.events.unlisten(et1, 'test', callback, true);
  assertFalse(goog.events.hasListener(et1));
}

function testHasListenerWithMultipleTargets() {
  function callback() {}

  goog.events.listen(et1, 'test1', callback, true);
  goog.events.listen(et2, 'test2', callback, true);

  assertTrue(goog.events.hasListener(et1));
  assertTrue(goog.events.hasListener(et2));
  assertTrue(goog.events.hasListener(et1, 'test1'));
  assertTrue(goog.events.hasListener(et2, 'test2'));

  assertFalse(goog.events.hasListener(et1, 'et2'));
  assertFalse(goog.events.hasListener(et2, 'et1'));

  goog.events.removeAll(et1);
  goog.events.removeAll(et2);
}

function testBubbleSingle() {
  et1.setParentEventTarget(et2);
  et2.setParentEventTarget(et3);

  let count = 0;
  function callback() { count++; }

  goog.events.listen(et3, 'test', callback, false);

  et1.dispatchEvent('test');

  assertEquals(1, count);

  goog.events.removeAll(et1);
  goog.events.removeAll(et2);
  goog.events.removeAll(et3);
}

function testCaptureSingle() {
  et1.setParentEventTarget(et2);
  et2.setParentEventTarget(et3);

  let count = 0;
  function callback() { count++; }

  goog.events.listen(et3, 'test', callback, true);

  et1.dispatchEvent('test');

  assertEquals(1, count);

  goog.events.removeAll(et1);
  goog.events.removeAll(et2);
  goog.events.removeAll(et3);
}

function testCaptureAndBubble() {
  et1.setParentEventTarget(et2);
  et2.setParentEventTarget(et3);

  let count = 0;
  function callbackCapture1() {
    count++;
    assertEquals(3, count);
  }
  function callbackBubble1() {
    count++;
    assertEquals(4, count);
  }

  function callbackCapture2() {
    count++;
    assertEquals(2, count);
  }
  function callbackBubble2() {
    count++;
    assertEquals(5, count);
  }

  function callbackCapture3() {
    count++;
    assertEquals(1, count);
  }
  function callbackBubble3() {
    count++;
    assertEquals(6, count);
  }

  goog.events.listen(et1, 'test', callbackCapture1, true);
  goog.events.listen(et1, 'test', callbackBubble1, false);
  goog.events.listen(et2, 'test', callbackCapture2, true);
  goog.events.listen(et2, 'test', callbackBubble2, false);
  goog.events.listen(et3, 'test', callbackCapture3, true);
  goog.events.listen(et3, 'test', callbackBubble3, false);

  et1.dispatchEvent('test');

  assertEquals(6, count);

  goog.events.removeAll(et1);
  goog.events.removeAll(et2);
  goog.events.removeAll(et3);

  // Try again with the new API:
  count = 0;

  goog.events.listen(et1, 'test', callbackCapture1, {capture: true});
  goog.events.listen(et1, 'test', callbackBubble1, {capture: false});
  goog.events.listen(et2, 'test', callbackCapture2, {capture: true});
  goog.events.listen(et2, 'test', callbackBubble2, {capture: false});
  goog.events.listen(et3, 'test', callbackCapture3, {capture: true});
  goog.events.listen(et3, 'test', callbackBubble3, {capture: false});

  et1.dispatchEvent('test');

  assertEquals(6, count);

  goog.events.removeAll(et1);
  goog.events.removeAll(et2);
  goog.events.removeAll(et3);


  // Try again with the new API and without capture simulation:
  if (!goog.events.BrowserFeature.HAS_W3C_EVENT_SUPPORT) return;
  goog.events.CAPTURE_SIMULATION_MODE =
      goog.events.CaptureSimulationMode.OFF_AND_FAIL;
  count = 0;

  goog.events.listen(et1, 'test', callbackCapture1, {capture: true});
  goog.events.listen(et1, 'test', callbackBubble1, {capture: false});
  goog.events.listen(et2, 'test', callbackCapture2, {capture: true});
  goog.events.listen(et2, 'test', callbackBubble2, {capture: false});
  goog.events.listen(et3, 'test', callbackCapture3, {capture: true});
  goog.events.listen(et3, 'test', callbackBubble3, {capture: false});

  et1.dispatchEvent('test');

  assertEquals(6, count);

  goog.events.removeAll(et1);
  goog.events.removeAll(et2);
  goog.events.removeAll(et3);
}

function testCapturingRemovesBubblingListener() {
  let bubbleCount = 0;
  function callbackBubble() { bubbleCount++; }

  let captureCount = 0;
  function callbackCapture() {
    captureCount++;
    goog.events.removeAll(et1);
  }

  goog.events.listen(et1, 'test', callbackCapture, true);
  goog.events.listen(et1, 'test', callbackBubble, false);

  et1.dispatchEvent('test');
  assertEquals(1, captureCount);
  assertEquals(0, bubbleCount);
}

function dispatchClick(target) {
  if (target.click) {
    target.click();
  } else {
    const e = document.createEvent('MouseEvents');
    e.initMouseEvent(
        'click', true, true, window, 0, 0, 0, 0, 0, false, false, false, false,
        0, null);
    target.dispatchEvent(e);
  }
}

function testHandleBrowserEventBubblingListener() {
  let count = 0;
  const body = document.body;
  goog.events.listen(body, 'click', function() { count++; });
  dispatchClick(body);
  assertEquals(1, count);
}

function testHandleBrowserEventCapturingListener() {
  let count = 0;
  const body = document.body;
  goog.events.listen(body, 'click', function() { count++; }, true);
  dispatchClick(body);
  assertEquals(1, count);
}

function testHandleBrowserEventCapturingAndBubblingListener() {
  let count = 1;
  const body = document.body;
  goog.events.listen(body, 'click', function() { count += 3; }, true);
  goog.events.listen(body, 'click', function() { count *= 5; }, false);
  dispatchClick(body);
  assertEquals(20, count);
}

function testHandleBrowserEventCapturingRemovesBubblingListener() {
  const body = document.body;

  let bubbleCount = 0;
  function callbackBubble() { bubbleCount++; }

  let captureCount = 0;
  function callbackCapture() {
    captureCount++;
    goog.events.removeAll(body);
  }

  goog.events.listen(body, 'click', callbackCapture, true);
  goog.events.listen(body, 'click', callbackBubble, false);

  dispatchClick(body);
  assertEquals(1, captureCount);
  assertEquals(0, bubbleCount);
}

function testHandleEventPropagationOnParentElement() {
  let count = 1;
  goog.events.listen(
      document.documentElement, 'click', function() { count += 3; }, true);
  goog.events.listen(
      document.documentElement, 'click', function() { count *= 5; }, false);
  dispatchClick(document.body);
  assertEquals(20, count);
}

function testEntryPointRegistry() {
  const monitor = new goog.debug.EntryPointMonitor();
  const replacement = function() {};
  monitor.wrap =
      goog.testing.recordFunction(goog.functions.constant(replacement));

  goog.debug.entryPointRegistry.monitorAll(monitor);
  assertTrue(monitor.wrap.getCallCount() >= 1);
  assertEquals(replacement, goog.events.handleBrowserEvent_);
}

// Fixes bug http://b/6434926
function testListenOnceHandlerDispatchCausingInfiniteLoop() {
  const handleFoo = goog.testing.recordFunction(function() {
    et1.dispatchEvent('foo');
  });

  goog.events.listenOnce(et1, 'foo', handleFoo);

  et1.dispatchEvent('foo');

  assertEquals(
      'Handler should be called only once.', 1, handleFoo.getCallCount());
}

function testCreationStack() {
  if (!new Error().stack) return;
  propertyReplacer.replace(goog.events.Listener, 'ENABLE_MONITORING', true);

  const div = goog.dom.createElement(goog.dom.TagName.DIV);
  const key =
      goog.events.listen(div, goog.events.EventType.CLICK, goog.nullFunction);
  const listenerStack = key.creationStack;

  // Check that the name of this test function occurs in the stack trace.
  assertContains('testCreationStack', listenerStack);
  goog.events.unlistenByKey(key);
}

function testListenOnceAfterListenDoesNotChangeExistingListener() {
  const listener = goog.testing.recordFunction();
  goog.events.listen(document.body, 'click', listener);
  goog.events.listenOnce(document.body, 'click', listener);

  dispatchClick(document.body);
  dispatchClick(document.body);
  dispatchClick(document.body);

  assertEquals(3, listener.getCallCount());
}

function testListenOnceAfterListenOnceDoesNotChangeExistingListener() {
  const listener = goog.testing.recordFunction();
  goog.events.listenOnce(document.body, 'click', listener);
  goog.events.listenOnce(document.body, 'click', listener);

  dispatchClick(document.body);
  dispatchClick(document.body);
  dispatchClick(document.body);

  assertEquals(1, listener.getCallCount());
}

function testListenAfterListenOnceRemoveOnceness() {
  const listener = goog.testing.recordFunction();
  goog.events.listenOnce(document.body, 'click', listener);
  goog.events.listen(document.body, 'click', listener);

  dispatchClick(document.body);
  dispatchClick(document.body);
  dispatchClick(document.body);

  assertEquals(3, listener.getCallCount());
}

function testUnlistenAfterListenOnce() {
  const listener = goog.testing.recordFunction();

  goog.events.listenOnce(document.body, 'click', listener);
  goog.events.unlisten(document.body, 'click', listener);
  dispatchClick(document.body);

  goog.events.listenOnce(document.body, 'click', listener);
  goog.events.listen(document.body, 'click', listener);
  goog.events.unlisten(document.body, 'click', listener);
  dispatchClick(document.body);

  goog.events.listen(document.body, 'click', listener);
  goog.events.listenOnce(document.body, 'click', listener);
  goog.events.unlisten(document.body, 'click', listener);
  dispatchClick(document.body);

  goog.events.listenOnce(document.body, 'click', listener);
  goog.events.listenOnce(document.body, 'click', listener);
  goog.events.unlisten(document.body, 'click', listener);
  dispatchClick(document.body);

  assertEquals(0, listener.getCallCount());
}

function testEventBubblingWithReentrantDispatch_bubbling() {
  runEventPropagationWithReentrantDispatch(false);
}

function testEventBubblingWithReentrantDispatch_capture() {
  runEventPropagationWithReentrantDispatch(true);
}

function runEventPropagationWithReentrantDispatch(useCapture) {
  const eventType = 'test-event-type';

  const child = et1;
  const parent = et2;
  child.setParentEventTarget(parent);

  const firstTarget = useCapture ? parent : child;
  const secondTarget = useCapture ? child : parent;

  const firstListener = function(evt) {
    if (evt.isFirstEvent) {
      // Fires another event of the same type the first time it is invoked.
      child.dispatchEvent(new goog.events.Event(eventType));
    }
  };
  goog.events.listen(firstTarget, eventType, firstListener, useCapture);

  const secondListener = goog.testing.recordFunction();
  goog.events.listen(secondTarget, eventType, secondListener, useCapture);

  // Fire the first event.
  const firstEvent = new goog.events.Event(eventType);
  firstEvent.isFirstEvent = true;
  child.dispatchEvent(firstEvent);

  assertEquals(2, secondListener.getCallCount());
}

function testEventPropagationWhenListenerRemoved_bubbling() {
  runEventPropagationWhenListenerRemoved(false);
}

function testEventPropagationWhenListenerRemoved_capture() {
  runEventPropagationWhenListenerRemoved(true);
}

function runEventPropagationWhenListenerRemoved(useCapture) {
  const eventType = 'test-event-type';

  const child = et1;
  const parent = et2;
  child.setParentEventTarget(parent);

  const firstTarget = useCapture ? parent : child;
  const secondTarget = useCapture ? child : parent;

  const firstListener = goog.testing.recordFunction();
  const secondListener = goog.testing.recordFunction();
  goog.events.listenOnce(firstTarget, eventType, firstListener, useCapture);
  goog.events.listen(secondTarget, eventType, secondListener, useCapture);

  child.dispatchEvent(new goog.events.Event(eventType));

  assertEquals(1, secondListener.getCallCount());
}

function testEventPropagationWhenListenerAdded_bubbling() {
  runEventPropagationWhenListenerAdded(false);
}

function testEventPropagationWhenListenerAdded_capture() {
  runEventPropagationWhenListenerAdded(true);
}

function runEventPropagationWhenListenerAdded(useCapture) {
  const eventType = 'test-event-type';

  const child = et1;
  const parent = et2;
  child.setParentEventTarget(parent);

  const firstTarget = useCapture ? parent : child;
  const secondTarget = useCapture ? child : parent;

  const firstListener = function() {
    goog.events.listen(secondTarget, eventType, secondListener, useCapture);
  };
  const secondListener = goog.testing.recordFunction();
  goog.events.listen(firstTarget, eventType, firstListener, useCapture);

  child.dispatchEvent(new goog.events.Event(eventType));

  assertEquals(1, secondListener.getCallCount());
}

function testEventPropagationWhenListenerAddedAndRemoved_bubbling() {
  runEventPropagationWhenListenerAddedAndRemoved(false);
}

function testEventPropagationWhenListenerAddedAndRemoved_capture() {
  runEventPropagationWhenListenerAddedAndRemoved(true);
}

function runEventPropagationWhenListenerAddedAndRemoved(useCapture) {
  const eventType = 'test-event-type';

  const child = et1;
  const parent = et2;
  child.setParentEventTarget(parent);

  const firstTarget = useCapture ? parent : child;
  const secondTarget = useCapture ? child : parent;

  const firstListener = function() {
    goog.events.listen(secondTarget, eventType, secondListener, useCapture);
  };
  const secondListener = goog.testing.recordFunction();
  goog.events.listenOnce(firstTarget, eventType, firstListener, useCapture);

  child.dispatchEvent(new goog.events.Event(eventType));

  assertEquals(1, secondListener.getCallCount());
}

function testAssertWhenUsedWithUninitializedCustomEventTarget() {
  const SubClass = function() { /* does not call superclass ctor */ };
  goog.inherits(SubClass, goog.events.EventTarget);

  const instance = new SubClass();

  let e;
  e = assertThrows(function() {
    goog.events.listen(instance, 'test1', function() {});
  });
  assertTrue(e instanceof goog.asserts.AssertionError);
  e = assertThrows(function() {
    goog.events.dispatchEvent(instance, 'test1');
  });
  assertTrue(e instanceof goog.asserts.AssertionError);
  e = assertThrows(function() { instance.dispatchEvent('test1'); });
  assertTrue(e instanceof goog.asserts.AssertionError);
}

function testAssertWhenDispatchEventIsUsedWithNonCustomEventTarget() {
  const obj = {};
  e = assertThrows(function() { goog.events.dispatchEvent(obj, 'test1'); });
  assertTrue(e instanceof goog.asserts.AssertionError);
}


function testPropagationStoppedDuringCapture() {
  const captureHandler = goog.testing.recordFunction(function(e) {
    e.stopPropagation();
  });
  const bubbleHandler = goog.testing.recordFunction();

  const body = document.body;
  const div = goog.dom.createElement(goog.dom.TagName.DIV);
  body.appendChild(div);
  try {
    goog.events.listen(body, 'click', captureHandler, true);
    goog.events.listen(div, 'click', bubbleHandler, false);
    goog.events.listen(body, 'click', bubbleHandler, false);

    dispatchClick(div);
    assertEquals(1, captureHandler.getCallCount());
    assertEquals(0, bubbleHandler.getCallCount());

    goog.events.unlisten(body, 'click', captureHandler, true);

    dispatchClick(div);
    assertEquals(2, bubbleHandler.getCallCount());
  } finally {
    goog.dom.removeNode(div);
    goog.events.removeAll(body);
    goog.events.removeAll(div);
  }
}

function testPropagationStoppedDuringBubble() {
  const captureHandler = goog.testing.recordFunction();
  const bubbleHandler1 = goog.testing.recordFunction(function(e) {
    e.stopPropagation();
  });
  const bubbleHandler2 = goog.testing.recordFunction();

  const body = document.body;
  const div = goog.dom.createElement(goog.dom.TagName.DIV);
  body.appendChild(div);
  try {
    goog.events.listen(body, 'click', captureHandler, true);
    goog.events.listen(div, 'click', bubbleHandler1, false);
    goog.events.listen(body, 'click', bubbleHandler2, false);

    dispatchClick(div);
    assertEquals(1, captureHandler.getCallCount());
    assertEquals(1, bubbleHandler1.getCallCount());
    assertEquals(0, bubbleHandler2.getCallCount());
  } finally {
    goog.dom.removeNode(div);
    goog.events.removeAll(body);
    goog.events.removeAll(div);
  }
}

function testAddingCaptureListenerDuringBubbleShouldNotFireTheListener() {
  const body = document.body;
  const div = goog.dom.createElement(goog.dom.TagName.DIV);
  body.appendChild(div);

  const captureHandler1 = goog.testing.recordFunction();
  const captureHandler2 = goog.testing.recordFunction();
  const bubbleHandler = goog.testing.recordFunction(function(e) {
    goog.events.listen(body, 'click', captureHandler1, true);
    goog.events.listen(div, 'click', captureHandler2, true);
  });

  try {
    goog.events.listen(div, 'click', bubbleHandler, false);

    dispatchClick(div);

    // These verify that the capture handlers registered in the bubble
    // handler is not invoked in the same event propagation phase.
    assertEquals(0, captureHandler1.getCallCount());
    assertEquals(0, captureHandler2.getCallCount());
    assertEquals(1, bubbleHandler.getCallCount());
  } finally {
    goog.dom.removeNode(div);
    goog.events.removeAll(body);
    goog.events.removeAll(div);
  }
}

function testRemovingCaptureListenerDuringBubbleWouldNotFireListenerTwice() {
  const body = document.body;
  const div = goog.dom.createElement(goog.dom.TagName.DIV);
  body.appendChild(div);

  const captureHandler = goog.testing.recordFunction();
  const bubbleHandler1 = goog.testing.recordFunction(function(e) {
    goog.events.unlisten(body, 'click', captureHandler, true);
  });
  const bubbleHandler2 = goog.testing.recordFunction();

  try {
    goog.events.listen(body, 'click', captureHandler, true);
    goog.events.listen(div, 'click', bubbleHandler1, false);
    goog.events.listen(body, 'click', bubbleHandler2, false);

    dispatchClick(div);
    assertEquals(1, captureHandler.getCallCount());

    // Verify that neither of these handlers are called more than once.
    assertEquals(1, bubbleHandler1.getCallCount());
    assertEquals(1, bubbleHandler2.getCallCount());
  } finally {
    goog.dom.removeNode(div);
    goog.events.removeAll(body);
    goog.events.removeAll(div);
  }
}

function testCaptureSimulationModeOffAndFail() {
  goog.events.CAPTURE_SIMULATION_MODE =
      goog.events.CaptureSimulationMode.OFF_AND_FAIL;
  const captureHandler = goog.testing.recordFunction();

  if (!goog.events.BrowserFeature.HAS_W3C_EVENT_SUPPORT) {
    const err = assertThrows(function() {
      goog.events.listen(document.body, 'click', captureHandler, true);
    });
    assertTrue(err instanceof goog.asserts.AssertionError);

    // Sanity tests.
    dispatchClick(document.body);
    assertEquals(0, captureHandler.getCallCount());
  } else {
    goog.events.listen(document.body, 'click', captureHandler, true);
    dispatchClick(document.body);
    assertEquals(1, captureHandler.getCallCount());
  }
}

function testCaptureSimulationModeOffAndSilent() {
  goog.events.CAPTURE_SIMULATION_MODE =
      goog.events.CaptureSimulationMode.OFF_AND_SILENT;
  const captureHandler = goog.testing.recordFunction();

  goog.events.listen(document.body, 'click', captureHandler, true);
  if (!goog.events.BrowserFeature.HAS_W3C_EVENT_SUPPORT) {
    dispatchClick(document.body);
    assertEquals(0, captureHandler.getCallCount());
  } else {
    dispatchClick(document.body);
    assertEquals(1, captureHandler.getCallCount());
  }
}
