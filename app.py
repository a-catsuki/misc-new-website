from flask import Flask, redirect, request, render_template, send_from_directory
from datetime import *

cur_date = datetime.now().strftime("%x").split("/")[:-1][::-1]
print(cur_date)

aims = ['To promote/ facilitate the discussion of cyber-security pertaining to the modern state of technology and politics', "To legally and ethically improve the offensive security skills of the club's participants in a practical manner",'To teach corporate network defence, mitigation and defensive security to members of the club','To participate in CTFs on behalf of the University','To connect with industry professionals such as “Red Teamers”, “Blue Teamers”, journalists, engineers, through guest lectures','To prepare club members with the skills and network required to pursue a career in cybersecurity']

committee = {'Amy Sun':'President', 'Natalie Lam':'Secretary', 'Pranav Gupta':'Vice President', 'Pearwa Patrida':'Treasurer', 'Owen Pearse':'Events Director', 'Dhruv Chaturvedi':'IT Director', 'Kevin Shah':'Industry Director', 'Rishi Mukherjee':'Publicity Director', 'Hayden Ma':'Publicity Director', 'Divyansh Kohli':'Education Director', 'Volodymyr Kazmirchuk':'Education Director'}

com_img = {'Amy Sun':'static\committe-img\-amy sec img.jpg', 'Pearwa Patrida':'static\committe-img\pat tres img.jpg', 'Natalie Lam':'static\committe-img\-nat event img.jpg', 'Pranav Gupta':'static\committe-img\-pranav_new.jpg', 'Rishi Mukherjee':"static\committe-img\-rishi pub img.jpg", 'Divyansh Kohli':'static\committe-img\-div_new.jpg', 'Kevin Shah':'static\committe-img\-kevin.png', 'Owen Pearse':'static\committe-img\-owen.jpeg', 'Volodymyr Kazmirchuk':'static\committe-img\-vova.png', 'Hayden Ma':'static\committe-img\-hayden.jpg','Dhruv Chaturvedi':'static\committe-img\-dhruv.jpg'}

cur_event_details = [['MISC@OWeek','22/02/2024','11:00am','L1 B168', 'static\_MISC OWEEK post.png',"Join us at MISC's O-Week stall to sign up for a FREE Membership, meet the MISC team and dive into the world of cybersecurity.",'https://use.mazemap.com/#v=1&campusid=200&zlevel=1&center=144.963052,-37.799318&zoom=19.5&sharepoitype=point&sharepoi=144.96304%2C-37.79923'],
                     ['Trivia Night','29/02/2024','5:15pm','Market Hall (B-189)', 'static\-trivia night post.jpg','Wanna make new friends? Come hangout with us for some fun trivia and free pizza. Did I mention there are prizes for winning team as well?','https://link.mazemap.com/8YESauMF'],
                     ['Atlassian Panel','05/03/2024','6:15pm','Old Arts (Room 129)', 'static\-atlassian panel post.png',' Join us for step-by-step guidance from past interns, recruiters and leads on securing and excelling in internships. Check out our socials for updates.','https://use.mazemap.com/#v=1&center=144.960199,-37.797840&zoom=18.2&zlevel=1&campusid=200&sharepoitype=poi&sharepoi=663489'],
                     ['FLAGGED 101','07/03/2024','6:00pm','David Caro 211', 'static\-workshop1 post.png','Start your cybersecurity journey from the basics with none other than our new workshop series, learning from some very cool people.','https://use.mazemap.com/#v=1&campusid=200&zlevel=2&center=144.964199,-37.796907&zoom=18&sharepoitype=poi&sharepoi=659752'],
                     ['FLAGGED 102','14/03/2024','5:30pm','Arts West 455', 'static\-flagged102.svg','Ever thought about hacking some websites or heard about SQL? with join us to discover some SQL Injections, learning from the experts (kinda).','https://use.mazemap.com/#v=1&campusid=200&zlevel=4&center=144.959272,-37.797821&zoom=20.9&sharepoitype=poi&sharepoi=1000461635'],
                     ['CyberCrêpes','20/03/2024','1:00pm','Carte Crêpes', 'static\-cartecrepes.svg','Bored of diversiTEA? ;) Join us for some chill vibes, networking and free crêpes.','https://use.mazemap.com/#v=1&campusid=200&zlevel=1&center=144.960318,-37.799225&zoom=17.8&sharepoitype=poi&sharepoi=1001584462'],
                     ['FLAGGED 103','21/03/2024','6:30pm','Old Arts (Room 129)', 'static\-flagged103.png','Fascinated by encryptions and ciphers? Join us to learn about the basics of cryptography with a European guest speaker.','https://use.mazemap.com/#v=1&center=144.960198,-37.798008&zoom=21.1&zlevel=1&campusid=200&sharepoitype=poi&sharepoi=663489'],
                     ['Special General Meeting','28/03/2024','5:30pm','Alan Gilbert (Room 121)', 'static\-sgm.png',"Get ready for an epic evening of delicious pizza and exciting opportunities as you have the chance to join the MISC committee - a perfect way to boost your resume, develop leadership skills, and make an impact in the cybersecurity space. Check our socials for details!",'https://use.mazemap.com/#v=1&campusid=200&zlevel=2&center=144.959195,-37.800231&zoom=21.2&sharepoitype=poi&sharepoi=668402'],
                     ['FLAGGED 104','18/04/2024','6:30pm','Old Arts (Room 129)', 'static\-flagged104.png','Join us for a 101 on binary exploitation (bad pun), where we guide you through the basics, and some ctf challenges accompanied with delicious pizza. ','https://use.mazemap.com/#v=1&center=144.960198,-37.798008&zoom=21.1&zlevel=1&campusid=200&sharepoitype=poi&sharepoi=663489'],
                     ['Internships with Fortian','23/04/2024','6:30pm','Old Arts (Room 129)', 'static\-fortian.png',"Join us for an informational session on internship opportunities provided by Fortian with their industry reps. PS There's pizza!",'https://use.mazemap.com/#v=1&center=144.960198,-37.798008&zoom=21.1&zlevel=1&campusid=200&sharepoitype=poi&sharepoi=663489'],
                     ['Internship Insights (Panel)','24/04/2024','6:30pm','Peter Hall (G03)', 'static\-insights.png',"An awesome evening with a panel of past cybersecurity interns who will spill the beans on what it takes to get an internship, especially in cybersecurity. Oh did I mention there's free dinner?",'https://use.mazemap.com/#v=1&campusid=200&zlevel=1&center=144.963654,-37.798169&zoom=18.3&sharepoitype=poi&sharepoi=663033']]

past_event_details = []

ppt_links = ['https://unimelbcloud-my.sharepoint.com/:p:/g/personal/kohlid_student_unimelb_edu_au/EYRywki4gXdNpy1oTYY8j6gBpGmrDLZfA6DcoAPpb6Gdjg?e=9deJKS','https://www.canva.com/design/DAF_q6wO6uA/2O6qKCPoWQplP2uMPFi7UQ/view?utm_content=DAF_q6wO6uA&utm_campaign=designshare&utm_medium=link&utm_source=editor','https://docs.google.com/presentation/d/1PbSWipUnQItzhmt-QsQKHa4ZWMb8gZh1/edit?usp=drive_link&ouid=102696975630975955262&rtpof=true&sd=true','https://www.canva.com/design/DAGCQYJFqmY/Od2S2rN-Ddhx9G0sckSy2g/edit?utm_content=DAGCQYJFqmY&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton']

for i in cur_event_details.copy():
    try:
        if "flagged" in i[0].lower():
            i.append(ppt_links[int(i[0][-1])-1])
    except:
        pass
    x = i[1].split('/')[:-1]
    print(x)
    if x[-1]<cur_date[-1]:
        print(x,"true")
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

@app.route('/robots.txt')
@app.route('/sitemap-new.xml')
def static_from_root():
    return send_from_directory(app.static_folder, request.path[1:])