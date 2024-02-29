from flask import Flask, redirect, request, render_template
from datetime import *

cur_date = datetime.now().strftime("%x").split("/")[:-1][::-1]
print(cur_date)

aims = ['To promote/ facilitate the discussion of cyber-security pertaining to the modern state of technology and politics', "To legally and ethically improve the offensive security skills of the club's participants in a practical manner",'To teach corporate network defence, mitigation and defensive security to members of the club','To participate in CTFs on behalf of the University','To connect with industry professionals such as “Red Teamers”, “Blue Teamers”, journalists, engineers, through guest lectures','To prepare club members with the skills and network required to pursue a career in cybersecurity']

committee = {'Katarina Stankovic':'President', 'Amy Sun':'Secretary', 'David Crowe':'Vice President', 'Pearwa Patrida':'Treasurer', 'Natalie Lam':'Events Director', 'Pranav Gupta':'IT Director', 'Rishi Mukherjee':'Publicity Director', 'Divyansh Kohli':'Education Director', 'Piotr Politowicz':'Education Director'}

com_img = {'Katarina Stankovic':'static\committe-img\kat prez img.jpg', 'Amy Sun':'static\committe-img\-amy sec img.jpg', 'David Crowe':'static\committe-img\david vp img.jpg', 'Pearwa Patrida':'static\committe-img\pat tres img.jpg', 'Natalie Lam':'static\committe-img\-nat event img.jpg', 'Pranav Gupta':'static\committe-img\pranav it img new.jpg', 'Rishi Mukherjee':"static\committe-img\-rishi pub img.jpg", 'Divyansh Kohli':'static\committe-img\divyansh edu img.jpg', 'Piotr Politowicz':'static\committe-img\piotr edu img.jpg'}

cur_event_details = [['MISC@OWeek','22/02/2024','11:00am','L1 B168', 'static\_MISC OWEEK post.png',"Join us at MISC's O-Week stall to sign up for a FREE Membership, meet the MISC team and dive into the world of cybersecurity.",'https://use.mazemap.com/#v=1&campusid=200&zlevel=1&center=144.963052,-37.799318&zoom=19.5&sharepoitype=point&sharepoi=144.96304%2C-37.79923'],
                     ['Trivia Night','29/02/2024','5:15pm','Market Hall (B-189)', 'static\-trivia night post.jpg','Wanna make new friends? Come hangout with us for some fun trivia and free pizza. Did I mention there are prizes for winning team as well?','https://link.mazemap.com/8YESauMF'],
                     ['Atlassian Panel','05/03/2024','6:15pm','Old Arts (Room 129)', 'static\-atlassian panel post.png',' Join us for step-by-step guidance from past interns, recruiters and leads on securing and excelling in internships. Check out our socials for updates.','https://use.mazemap.com/#v=1&center=144.960199,-37.797840&zoom=18.2&zlevel=1&campusid=200&sharepoitype=poi&sharepoi=663489'],
                     ['FLAGGED 101','07/03/2024','6:00pm','TBC', 'static\-workshop1 post.png','Start your cybersecurity journey from the basics with none other than our new workshop series, learning from some very cool people.','#']]

past_event_details = []

for i in cur_event_details:
    x = i[1].split('/')[:-1]
    if x[-1]<cur_date[-1]:
        past_event_details.insert(0,i)
        cur_event_details.remove(i)
    elif x[-1]==cur_date[-1]:
        if x[0]<cur_date[0]:
            past_event_details.insert(0,i)
            cur_event_details.remove(i)

print(cur_event_details)
print(past_event_details)

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

@app.route("/secret-guide", methods = ["GET","POST"])
def secret_guide():
    return render_template("secret-guide.html")

@app.route("/back-to-home")
def back_to_home():
    return redirect("/")

@app.errorhandler(404)
def page_not_found(e):
    return render_template('404.html'), 404

@app.route("/xml-sitemap")
def xml_sitemap():
    return render_template('sitemap.xml')