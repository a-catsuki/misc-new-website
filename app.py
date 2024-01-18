from flask import Flask, redirect, request, render_template
from datetime import *

cur_date = datetime.now().strftime("%x").split("/")[:-1][::-1]

aims = ['To promote/ facilitate the discussion of cyber-security pertaining to the modern state of technology and politics', "To legally and ethically improve the offensive security skills of the club's participants in a practical manner",'To teach corporate network defence, mitigation and defensive security to members of the club','To participate in CTFs on behalf of the University','To connect with industry professionals such as “Red Teamers”, “Blue Teamers”, journalists, engineers, through guest lectures','To prepare club members with the skills and network required to pursue a career in cybersecurity']

committee = {'Katarina Stankovic':'President', 'Amy Sun':'Secretary', 'David Crowe':'Vice President', 'Pearwa Patrida':'Treasurer', 'Natalie Lam':'Events Director', 'Pranav Gupta':'IT Director', 'Rishi Mukherjee':'Publicity Director', 'Divyansh Kohli':'Education Director', 'Piotr Politowicz':'Education Director'}

com_img = {'Katarina Stankovic':'static\committe-img\kat prez img.jpg', 'Amy Sun':'static\committe-img\-amy sec img.jpg', 'David Crowe':'static\committe-img\david vp img.jpg', 'Pearwa Patrida':'static\committe-img\pat tres img.jpg', 'Natalie Lam':'static\committe-img\-nat event img.jpg', 'Pranav Gupta':'static\committe-img\pranav it img new.jpg', 'Rishi Mukherjee':"static\committe-img\-rishi pub img.jpg", 'Divyansh Kohli':'static\committe-img\divyansh edu img.jpg', 'Piotr Politowicz':'static\committe-img\piotr edu img.jpg'}

cur_event_details = [['Name','16/12/2023','2:00pm','Location', 'https://via.placeholder.com/400x200','Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corporis deleniti maiores nam excepturi ut ipsum id libero optio fugit ducimus!'],['Name','19/12/2023','2:00pm','Location', 'https://via.placeholder.com/400x200','Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corporis deleniti maiores nam excepturi ut ipsum id libero optio fugit ducimus!'],['Name','21/12/2023','2:00pm','Location', 'https://via.placeholder.com/400x200','Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corporis deleniti maiores nam excepturi ut ipsum id libero optio fugit ducimus!']]

past_event_details = [['Name','17/11/2023','2:00pm','Location', 'https://via.placeholder.com/400x200','Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corporis deleniti maiores nam excepturi ut ipsum id libero optio fugit ducimus!'],['Name','17/11/2023','2:00pm','Location', 'https://via.placeholder.com/400x200','Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corporis deleniti maiores nam excepturi ut ipsum id libero optio fugit ducimus!'],['Name','17/11/2023','2:00pm','Location', 'https://via.placeholder.com/400x200','Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corporis deleniti maiores nam excepturi ut ipsum id libero optio fugit ducimus!']]

for i in cur_event_details:
    x = i[1].split('/')[:-1]
    if x[-1]<cur_date[-1]:
        past_event_details.insert(0,i)
        cur_event_details.remove(i)
    elif x[-1]==cur_date[-1]:
        if x[0]<cur_date[0]:
            past_event_details.insert(0,i)
            cur_event_details.remove(i)

app = Flask(__name__)

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/about", methods = ["GET","POST"])
def about():
    return render_template("about.html", aims=aims, committee=committee, com_img=com_img)

@app.route("/events", methods = ["GET","POST"])
def events():
    return render_template("events.html", cur_event_details=cur_event_details, past_event_details=past_event_details)

@app.route("/gallery", methods = ["GET","POST"])
def gallery():
    return render_template("gallery.html")

@app.route("/sponsors", methods = ["GET","POST"])
def sponsors():
    return render_template("sponsors.html")

@app.route("/back-to-home")
def back_to_home():
    return redirect("/")