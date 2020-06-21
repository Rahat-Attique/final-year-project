
goog.provide('Blockly.Blocks.custom');

goog.require('Blockly.Blocks');
goog.require('Blockly');

Blockly.Blocks['move_Up'] = {
    init: function() {
    this.appendDummyInput()
    .appendField("move Up");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour(290);
    this.setTooltip('');
   // this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Blocks['move_TeacherUp'] = {
    init: function() {
    this.appendDummyInput()
    .appendField("Move Up");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour(290);
    this.setTooltip('');
   // this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Blocks['move_Right'] = {
    init: function() {
    this.appendDummyInput()
    .appendField("move Right");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour(290);
    this.setTooltip('');
   // this.setHelpUrl('http://www.example.com/');
  }
};


Blockly.Blocks['move_TeacherRight'] = {
    init: function(){
    this.appendDummyInput()
    .appendField("Move Right");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour(290);
    this.setTooltip('');
   // this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Blocks['move_Left'] = {
    init: function() {
    this.appendDummyInput()
    .appendField("move Left");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour(290);
    this.setTooltip('');
  this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Blocks['move_TeacherLeft'] = {
    init: function() {
    this.appendDummyInput()
    .appendField("Move Left");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour(290);
    this.setTooltip('');
  this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Blocks['move_Down'] = {
    init: function() {
    this.appendDummyInput()
    .appendField("move Down");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour(290);
    this.setTooltip('');
   this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Blocks['move_TeacherDown'] = {
    init: function() {
    this.appendDummyInput()
    .appendField("Move Down");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour(290);
    this.setTooltip('');
   this.setHelpUrl('http://www.example.com/');
  }
};
Blockly.Blocks['repeat'] = {
  init: function() {
    this.jsonInit({
    "type": "controls_repeat_ext",
    "message0": "%{BKY_CONTROLS_REPEAT_TITLE}",
    "args0": [{
      "type": "input_value",
      "name": "TIMES",
      "check": "Number"
    }],
    "message1": "%{BKY_CONTROLS_REPEAT_INPUT_DO} %1",
    "args1": [{
      "type": "input_statement",
      "name": "DO"
    }],
    "previousStatement": null,
    "nextStatement": null,
    "style": "loop_blocks",
    "tooltip": "%{BKY_CONTROLS_REPEAT_TOOLTIP}",
    "helpUrl": "%{BKY_CONTROLS_REPEAT_HELPURL}"
  });
  
  }
};
Blockly.Blocks['account_number'] = {
  // Other type.
  init: function() {
    this.jsonInit({
      "message0": " vh%2",
      "args0": [{"type": "field_input", "name": "TYPE", "text": ""}],
      "output": "Type",
      "colour": 320,
	
      "tooltip": "Custom type to allow.",
      "helpUrl": "https://www.youtube.com/watch?v=s2_xaEvcVI0#t=702"
    });
  }
};

Blockly.Blocks['number'] = {
  init: function() {
	  this.jsonInit({
  
	 "message0": " %1",
     "args0": [{"type": "field_input", "name": "TYPE", "text" : ""}],
     "output": "Number",
     "colour": 120,
	 
      "tooltip": " ",
	  "helpUrl": "http://www.example.com/'"
 
 
 });
	
    // this.appendDummyInput()
        // .appendField()
        // .appendField(new Blockly.FieldTextInput('0'),
            // 'FIELDNAME');
    // this.setTooltip('Delay specific time');
	// this.setColour(290);
    // this.setOutput(true, 'Number');
  }
};


// Blockly.Blocks['move_Forward'] = {
    // init: function() {
    // this.appendDummyInput()
    // .appendField("move Forward");
    // this.setPreviousStatement(true);
    // this.setNextStatement(true);
    // this.setColour(290);
    // this.setTooltip('');
   // this.setHelpUrl('http://www.example.com/');
  // }
// };
Blockly.Blocks['base_delay_example'] = {
  helpUrl: 'http://arduino.cc/en/Reference/delay',
  init: function() {
    this.setColour(120);
    this.appendValueInput("Motion", 'Number')
        .appendField("Delay whee")
        .setCheck('Number');
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('Delay specific time');
  }
};
Blockly.Blocks['example_dropdown'] = {
  init: function() {
    this.appendDummyInput()

        .appendField('Reapeat:')
        .appendField(new Blockly.FieldDropdown([
            ['up', 'UP'],
            ['down', 'DOWN'],
			['left', 'LEFT'],
            ['right', 'RIGHT']
        ]), 'FIELDNAME');

 this.appendValueInput("FIRST")
        .setCheck(null)
		   this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};
////////////////teacher loop///
Blockly.Blocks['example_dropdownt'] = {
  init: function() {
    this.appendDummyInput()

        .appendField('Reapeat:')
        .appendField(new Blockly.FieldDropdown([
            ['up', 'UP'],
            ['down', 'DOWN'],
			['left', 'LEFT'],
            ['right', 'RIGHT']
        ]), 'FIELDNAME');

 this.appendValueInput("FIRST")
        .setCheck(null)
		   this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};
//////////////////////////////
Blockly.Blocks['var_block'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Display var:")

        .appendField(new Blockly.FieldVariable("item"), "MYVAR");
		
        
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};
Blockly.Blocks['dynamic_dropdown'] = {
  init: function() {
    var input = this.appendDummyInput()
      .appendField('day')
      .appendField(new Blockly.FieldDropdown(
        this.generateOptions), 'DAY');
  },

  generateOptions: function() {
    var options = [];
    var now = Date.now();
    for(var i = 0; i < 7; i++) {
      var dateString = String(new Date(now)).substring(0, 3);
      options.push([dateString, dateString.toUpperCase()]);
      now += 24 * 60 * 60 * 1000;
    }
    return options;
  }
};