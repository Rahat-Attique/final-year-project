/**
 * @license
 * Visual Blocks Language
 *
 * Copyright 2012 Google Inc.
 * https://developers.google.com/blockly/
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Generating JavaScript for logic blocks.
 * @author q.neutron@gmail.com (Quynh Neutron)
 */
'use strict';

goog.provide('Blockly.JavaScript.logic');

goog.require('Blockly.JavaScript');
var imported = document.createElement('script');
imported.src = 'static/js/maze.js';
document.head.appendChild(imported);

var importtwo = document.createElement('script');
importtwo.src = 'static/js/MazeforTeacherInterface.js';
document.head.appendChild(importtwo);


Blockly.JavaScript['move_Up'] = function(block) {
	var msg;
	msg="Up";
    setTimeout(function (){
		 callfunctionUp();
	 },1000);
	
    return msg + "\n";
		
	
};

Blockly.JavaScript['move_Right'] = function(block) {
	var msg;
	msg="Right";
	 setTimeout(
		 callfunctionRight, 1000);
		

    return msg + "\n";

  
 };
Blockly.JavaScript['move_Down'] = function(block) {
	var msg;
	msg="down";

   setTimeout( callfunctionDown,1000);
       return msg + "\n";
  
 };
 Blockly.JavaScript['move_Left'] = function(block) {
	var msg;
	msg="left";
 setTimeout(function (){
		 callfunctionLeft();
	 },1000);
    return msg + "\n";
  // ball.moveRight();
  
 };
 //.....................................................................................For Teacher
 
 
Blockly.JavaScript['move_TeacherUp'] = function(block) {
	var msg;
	msg="Up";

	 function makeSlection(cat) {
    //alert('hello im inside makeselection function');
    setTimeout(function(){ pelay(cat); },5000);
	}

	function pelay(cate){
	     // ball.moveUp();
		ball.moveTeacherUp();
	}
	makeSlection('foo');
	
    return msg + "\n";
		
	
};

Blockly.JavaScript['move_TeacherRight'] = function(block) {
	var msg;
	msg="Right";
	 function makeSlection(cat) {
    //alert('hello im inside makeselection function');
    setTimeout(function(){ pelay(cat); },5000);
	}

	function pelay(cate){
	    ball.moveTeacherRight();
		
	}

	makeSlection('foo');
    return msg + "\n";

  
 };
Blockly.JavaScript['move_TeacherDown'] = function(block) {
	var msg;
	msg="down";
	//console.log("rigjt");
	//alert(msg);
  function makeSlection(cat) {
    //alert('hello im inside makeselection function');
    setTimeout(function(){ pelay(cat); },5000);
}

	function pelay(cate){
		ball.moveTeacherDown();
	}
	
	makeSlection('foo');
    return msg + "\n";
  // ball.moveRight();
  
 };
 Blockly.JavaScript['move_TeacherLeft'] = function(block) {
	var msg;
	msg="left";
	//console.log("rigjt");
	//alert(msg);
	 function makeSlection(cat) {
    //alert('hello im inside makeselection function');
    setTimeout(function(){ pelay(cat); },5000);
      }

	function pelay(cate){
	    ball.moveTeacherLeft();
		
	}
	
	makeSlection('foo');
	
    return msg + "\n";
  // ball.moveRight();
  
 };
  Blockly.JavaScript['var_block'] = function(block) {
  var myvar = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('MYVAR'), Blockly.Variables.NAME_TYPE);
  console.log(myvar);
  var code = '...';  //Build code here
  return code;
};
////////student loop////////////
Blockly.JavaScript['example_dropdown'] = function(block) {
	
 // var myvar = Blockly.JavaScript.(block.getFieldValue('MYVAR'), Blockly.Variables.NAME_TYPE);
  //var myvar = Blockly.JavaScript.(block.getSelectedValue(FIELDNAME));
   var myval = block.getFieldValue('FIELDNAME');
    var va = Blockly.JavaScript.valueToCode(block, 'FIRST', Blockly.JavaScript.ORDER_ATOMIC);
    //  var myval2 = block.getFieldValue('FIELDNAME2');
  console.log(va);
  console.log(myval);
  if(myval=='UP' && va=='2')
  {
 
	 loopup();
 }
	if(myval=='UP' && va=='3')
  {loopup2();
 
 }
		if(myval=='UP' && va=='4')
  {
	  loopup3();
 }
			if(myval=='DOWN' && va=='4')
  {loopdn3();
}
	if(myval=='DOWN' && va=='3')
  {
 loopdn2();}
    if(myval=='DOWN' && va=='2')
  {
  loopdn();}
///////////////lett right///////////////////////
  if(myval=='LEFT' && va=='2')
  {
 looplf();}
	if(myval=='LEFT' && va=='3')
  {
looplf2();}
		if(myval=='LEFT' && va=='4')
  {
 looplf3();}
			if(myval=='RIGHT' && va=='4')
  {
looprt3();
  }
	if(myval=='RIGHT' && va=='3')
  {
 looprt2();}
    if(myval=='RIGHT' && va=='2')
  {
  looprt();
}
  if(myval=='RIGHT' && va>4)
  {
 alert("Only 4 times counter is allowed");
}  if(myval=='UP' && va>4)
  {
 alert("Only 4 times counter is allowed");
}  if(myval=='DOWN' && va>4)
  {
 alert("Only 4 times counter is allowed");
}  if(myval=='LEFT' && va>4)
  {
 alert("Only 4 times counter is allowed");
}
  if(myval=='UP' && va<2)
  {
 alert("Use block to move one step ahead");
}  if(myval=='DOWN' && va<2)
  {
 alert("Use block to move one step ahead");
}  if(myval=='LEFT' && va<2)
  {
 alert("Use block to move one step ahead");
}  if(myval=='RIGHT' && va<2)
  {
 alert("Use block to move one step ahead");
}
///////////////////////////////////////////////
	  
  var code = '...';  //Build code here
  return code;
};
////////////////////////teacherloop.//////////////////////
Blockly.JavaScript['example_dropdownt'] = function(block) {
	
 // var myvar = Blockly.JavaScript.(block.getFieldValue('MYVAR'), Blockly.Variables.NAME_TYPE);
  //var myvar = Blockly.JavaScript.(block.getSelectedValue(FIELDNAME));
   var myval = block.getFieldValue('FIELDNAME');
    var va = Blockly.JavaScript.valueToCode(block, 'FIRST', Blockly.JavaScript.ORDER_ATOMIC);
    //  var myval2 = block.getFieldValue('FIELDNAME2');
  console.log(va);
  console.log(myval);
  if(myval=='UP' && va=='2')
  {
	 loopupt();
 }
	if(myval=='UP' && va=='3')
  {loopupt2();
 
 }
		if(myval=='UP' && va=='4')
  {
	  loopupt3();
 }
			if(myval=='DOWN' && va=='4')
  {loopdnt3();
}
	if(myval=='DOWN' && va=='3')
  {
 loopdnt2();}
    if(myval=='DOWN' && va=='2')
  {
  loopdnt();}
///////////////lett right///////////////////////
  if(myval=='LEFT' && va=='2')
  {
 looplft();}
	if(myval=='LEFT' && va=='3')
  {
looplft2();}
		if(myval=='LEFT' && va=='4')
  {
 looplft3();}
			if(myval=='RIGHT' && va=='4')
  {
looprtt3();
  }
	if(myval=='RIGHT' && va=='3')
  {
 looprtt2();}
    if(myval=='RIGHT' && va=='2')
  {
  looprtt();
}
  if(myval=='RIGHT' && va>4)
  {
 alert("Only 4 times counter is allowed");
}
  if(myval=='UP' && va>4)
  {
 alert("Only 4 times counter is allowed");
}  if(myval=='LEFT' && va>4)
  {
 alert("Only 4 times counter is allowed");
}  if(myval=='DOWN' && va>4)
  {
 alert("Only 4 times counter is allowed");
}
  if(myval=='UP' && va<2)
  {
 alert("Use block to move one step ahead");
}  if(myval=='DOWN' && va<2)
  {
 alert("Use block to move one step ahead");
}  if(myval=='LEFT' && va<2)
  {
 alert("Use block to move one step ahead");
}  if(myval=='RIGHT' && va<2)
  {
 alert("Use block to move one step ahead");
}
///////////////////////////////////////////////
	  
  var code = '...';  //Build code here
  return code;
};
////////////////////////////////////////////////////////////
 // Blockly.JavaScript['repeat'] = function(block) {
  // // Repeat n times.
  // console.log("looooop");
  // // if (block.getField('TIMES')) {
    // // // Internal number.
     // var repeats = block.getFieldValue('TIMES');
	 // var code = block.getFieldValue('Number');
     // console.log(repeats);
     // console.log(code);
     // return code;
// };
 
 
 
 // Blockly.JavaScript['number'] = function(block) {
    // var code = block.getFieldValue('TYPE');
	// console.log(code);
    // return code;
// }

  
Blockly.JavaScript['controls_if'] = function(block) {
  // If/elseif/else condition.
  var n = 0;
  var code = '', branchCode, conditionCode;
  do {
    conditionCode = Blockly.JavaScript.valueToCode(block, 'IF' + n,
      Blockly.JavaScript.ORDER_NONE) || 'false';
    branchCode = Blockly.JavaScript.statementToCode(block, 'DO' + n);
    code += (n > 0 ? ' else ' : '') +
        'if (' + conditionCode + ') {\n' + branchCode + '}';

    ++n;
  } while (block.getInput('IF' + n));

  if (block.getInput('ELSE')) {
    branchCode = Blockly.JavaScript.statementToCode(block, 'ELSE');
    code += ' else {\n' + branchCode + '}';
  }
  return code + '\n';
};

Blockly.JavaScript['controls_ifelse'] = Blockly.JavaScript['controls_if'];

Blockly.JavaScript['logic_compare'] = function(block) {
  // Comparison operator.
  var OPERATORS = {
    'EQ': '==',
    'NEQ': '!=',
    'LT': '<',
    'LTE': '<=',
    'GT': '>',
    'GTE': '>='
  };
 
  var operator = OPERATORS[block.getFieldValue('OP')];
  var order = (operator == '==' || operator == '!=') ?
      Blockly.JavaScript.ORDER_EQUALITY : Blockly.JavaScript.ORDER_RELATIONAL;
  var argument0 = Blockly.JavaScript.valueToCode(block, 'A', order) || '0';
  var argument1 = Blockly.JavaScript.valueToCode(block, 'B', order) || '0';
  var code = argument0 + ' ' + operator + ' ' + argument1;
  return [code, order];
};

Blockly.JavaScript['logic_operation'] = function(block) {
  // Operations 'and', 'or'.
  var operator = (block.getFieldValue('OP') == 'AND') ? '&&' : '||';
  var order = (operator == '&&') ? Blockly.JavaScript.ORDER_LOGICAL_AND :
      Blockly.JavaScript.ORDER_LOGICAL_OR;
  var argument0 = Blockly.JavaScript.valueToCode(block, 'A', order);
  var argument1 = Blockly.JavaScript.valueToCode(block, 'B', order);
  if (!argument0 && !argument1) {
    // If there are no arguments, then the return value is false.
    argument0 = 'false';
    argument1 = 'false';
  } else {
    // Single missing arguments have no effect on the return value.
    var defaultArgument = (operator == '&&') ? 'true' : 'false';
    if (!argument0) {
      argument0 = defaultArgument;
    }
    if (!argument1) {
      argument1 = defaultArgument;
    }
  }
  var code = argument0 + ' ' + operator + ' ' + argument1;
  return [code, order];
};

Blockly.JavaScript['logic_negate'] = function(block) {
  // Negation.
  var order = Blockly.JavaScript.ORDER_LOGICAL_NOT;
  var argument0 = Blockly.JavaScript.valueToCode(block, 'BOOL', order) ||
      'true';
  var code = '!' + argument0;
  return [code, order];
};

Blockly.JavaScript['logic_boolean'] = function(block) {
  // Boolean values true and false.
  var code = (block.getFieldValue('BOOL') == 'TRUE') ? 'true' : 'false';
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['logic_null'] = function(block) {
  // Null data type.
  return ['null', Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['logic_ternary'] = function(block) {
  // Ternary operator.
  var value_if = Blockly.JavaScript.valueToCode(block, 'IF',
      Blockly.JavaScript.ORDER_CONDITIONAL) || 'false';
  var value_then = Blockly.JavaScript.valueToCode(block, 'THEN',
      Blockly.JavaScript.ORDER_CONDITIONAL) || 'null';
  var value_else = Blockly.JavaScript.valueToCode(block, 'ELSE',
      Blockly.JavaScript.ORDER_CONDITIONAL) || 'null';
  var code = value_if + ' ? ' + value_then + ' : ' + value_else;
  return [code, Blockly.JavaScript.ORDER_CONDITIONAL];
};
