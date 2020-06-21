from flask import Flask, render_template, request, jsonify, redirect, url_for
import random, json
import numpy as np
import cozmo
import csv
import flask
from cozmo.util import degrees, distance_mm, speed_mmps
app = Flask(__name__)


# First we will get data from js file then store data in word
# replace spaces with 1
# apply condition base on 1 ,seprate the words(up,right,down...)
### and then store in final array after reversing .
##@app.route('/get_data', methods=['GET','POST'])
##def data():
##    data=request.form['javascript_data']
####    data = request.get_json()
##    result_array = np.empty((0, 100))
##    result='' # store data from js file
##    dataarray=[]# store new array having 1 instead of space
##    for item in data:
##        result +=item
##
##    count=0
##    word=''
##    # rerplace space with 1
##    for a in result:
##        if (a.isspace()) == False:
##            dataarray.extend(a)
##            count+=1
##        else:
##            dataarray.extend('1')
##            count+=1
##
##
####
####    for x in range(len(dataarray)):
####        print(dataarray[x])
##    index=0
##    # store words 
##    finalArray = []
##    for y in range(len(dataarray)):
##        if dataarray[y]=='1':
##
##            for x in range(index, y):
##                word= dataarray[x] + word
##                index=y+1
###           reverse strig    
##            word=word[::-1]
##            # store in final array
##            finalArray.append(word)
##            word=''
##      # run loop om final array and apply conditions.      
##    for c in range(len(finalArray)):
##        if finalArray[c]=='Up':
##            print("up")
##            cozmo.run_program(program)
##        elif finalArray[c]=='down':
##            print("down")
##            cozmo.run_program(program)
##        elif finalArray[c]=='Right':
##            print("right")
##            cozmo.run_program(Right)
##        else:
##            print("left")
##            cozmo.run_program(Left)
##
##
##
##    return render_template('blockly.html')
##
##
##
##@app.route('/program', methods=['GET','POST'])
##def program(robot: cozmo.robot.Robot):
##        
##      # Drive forwards for 150 millimeters at 50 millimeters-per-second.
##        robot.drive_straight(distance_mm(150), speed_mmps(50)).wait_for_completed()
##       # Turn 90 degrees to the left.
##       # Note: To turn to the right, just use a negative number.
##       # robot.turn_in_place(degrees(90)).wait_for_completed()
##       
##
##
###move down_left				
##@app.route('/left',methods=['GET','POST'])		
##def Left(robot):
##        
##       #Drive forwards for 150 millimeters at 50 millimeters-per-second.
##        #robot.drive_straight(distance_mm(150), speed_mmps(50)).wait_for_completed()
##        robot.turn_in_place(degrees(-90)).wait_for_completed()
##        robot.drive_straight(distance_mm(100), speed_mmps(50)).wait_for_completed()	
##
##
###move down_left				
##@app.route('/Up',methods=['GET','POST'])		
##def Left(robot):
##        
##       #Drive forwards for 150 millimeters at 50 millimeters-per-second.
##        #robot.drive_straight(distance_mm(150), speed_mmps(50)).wait_for_completed()
##        robot.turn_in_place(degrees(90)).wait_for_completed()
##        robot.drive_straight(distance_mm(100), speed_mmps(50)).wait_for_completed()	
##
##
###move down_left				
##@app.route('/down',methods=['GET','POST'])		
##def Left(robot):
##        
##       #Drive forwards for 150 millimeters at 50 millimeters-per-second.
##        #robot.drive_straight(distance_mm(150), speed_mmps(50)).wait_for_completed()
##        robot.turn_in_place(degrees(-270)).wait_for_completed()
##        robot.drive_straight(distance_mm(100), speed_mmps(50)).wait_for_completed()	
##
##
##
###move down_right
##@app.route('/right',methods=['GET','POST'])
##def Right(robot: cozmo.robot.Robot):
##     # Drive forwards for 150 millimeters at 50 millimeters-per-second.
## 
##        #robot.drive_straight(distance_mm(150), speed_mmps(50)).wait_for_completed()
##        robot.turn_in_place(degrees(360)).wait_for_completed()
##        robot.drive_straight(distance_mm(100), speed_mmps(50)).wait_for_completed()
##


@app.route('/StageOne',methods=['GET','POST'])
def StageOne():
        number=1
        return render_template('blockly.html',number=number)

@app.route('/StageTwo',methods=['GET','POST'])
def StageTwo():
        number=2
        return render_template('blockly.html',number=number)

@app.route('/StageThree',methods=['GET','POST'])
def StageThree():
        number=3
        return render_template('blockly.html',number=number)

@app.route('/StageFour',methods=['GET','POST'])
def StageFour():
        number=4
        return render_template('blockly.html',number=number)

@app.route('/StageFive',methods=['GET','POST'])
def StageFive():
        number=5
        return render_template('blockly.html',number=number)

@app.route('/StageSix',methods=['GET','POST'])
def StageSix():
        number=6
        return render_template('blockly.html',number=number)

@app.route('/StageSeven',methods=['GET','POST'])
def StageSeven():
        number=7
        return render_template('blockly.html',number=number)

@app.route('/StageEight',methods=['GET','POST'])
def StageEight():
        number=8
        return render_template('blockly.html',number=number)

@app.route('/StageNine',methods=['GET','POST'])
def StageNine():
        number=9
        return render_template('blockly.html',number=number)


@app.route('/StageTen',methods=['GET','POST'])
def StageTen():
        number=10
        return render_template('blockly.html',number=number)


@app.route('/get_stage',methods=['GET','POST'])
def getstageone():
##        
##        data=request.form['javascript_data']
##        data = request.get_json()
##        print(data)
        data='1'
     
        return render_template('homepage.html',data=data)

####read rows and columns from file
@app.route('/homepage',methods=['GET','POST'])
def gethome():
        data='2'
       
        return render_template('homepage.html',data=data)

@app.route('/Teacherinterface',methods=['GET','POST'])
def getteacher():
        data='3'
       
        return render_template('Teacherinterface.html',data=data)

@app.route('/MadeByTeacher',methods=['GET','POST'])
def MadeByTeacher():

        filename="TeacherDesignedStages/scenario.txt"
        numlines=0
        columns=0
        count=0
        #calculate number of rows
        with open(filename,'r') as file:
                for line in file:
                        numlines += 1
        #calculate number of columns            
        with open(filename) as f:
                line = f.readline()
                columns=len(line.split())

       # read position from file where B(hurdles) is present 
       # i and j will use to get row and column of that row
        RowIndexofhurdles=[]
        ColIndexofhurdles=[]
        listofImages=[]
        rowIndexofImages=[]
        colIndexofImages=[]
        backGroundImage=''
        with open(filename,encoding='utf-8-sig') as file:
                i=0 # row no
                text=file.readlines()
              
                for line in text:
                     
                        j=1 #column no
                        words=line.split()# words of first list
                        print("words",words)
                        for word in words:
                                
                                
                                 if word == 'B':
                                         RowIndexofhurdles.append(i) # get row that has B in it
                                         ColIndexofhurdles.append(j)# get col of that row
                                         count+=1
                                 elif word == 'url("/static/images/self.jpg")' :
                                         backGroundImage= "static/images/self.jpg"
                                 elif word == 'url("/static/images/reg.jpg")' :
                                         backGroundImage= "static/images/reg.jpg"
                                 elif word == 'url("/static/images/so.jpg")' :
                                         backGroundImage= "static/images/so.jpg"
                                 elif word == 'url("/static/images/a.jpg")' :
                                         backGroundImage= "static/images/a.jpg"
                                 elif word == 'url("/static/images/mot.jpg")' :
                                         backGroundImage= "static/images/mot.jpg"
                                                  
                                 elif word != 'O' and word !='B' and word != 'url("/static/images/self.jpg")':
                                         listofImages.append(word)
                                         rowIndexofImages.append(i)
                                         colIndexofImages.append(j)                            
                                         
                                 j+=1       
       
                        i+=1
        if backGroundImage == '' :
                numlines=numlines
        else :
                numlines=numlines-1

        # save imags in list to load them
        
        listdata = {'columns': columns, 'rows': numlines,'backGroundImage':backGroundImage, 'hurdlerowposition':RowIndexofhurdles, 'hurdlecolposition':ColIndexofhurdles,'imagelist':listofImages,'imagerowlist':rowIndexofImages,'imagecollist':colIndexofImages}
        print(numlines,listofImages,)
       # print(listofImages,rowIndexofImages,colIndexofImages)  
        return render_template('scenarioFromFile.html',listdata=listdata)

@app.route('/')
def index():
        return render_template('home.html')
         

if __name__ == '__main__':
	app.run()







