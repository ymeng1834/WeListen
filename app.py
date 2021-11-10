# from flask import Flask
# from flask import render_template

# app = Flask(__name__)


# @app.route('/')
# def hello():
#     return render_template("index.html")


from flask import Flask
from flask import request
from flask.templating import render_template
from flask import jsonify

from search import *
app = Flask(__name__)

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def catch_all(path):
    return render_template("index.html")



@app.route('/search', methods = ['GET'])
def handle_stream_request():
    title = request.args.get('title', '')
    artist = request.args.get('artist', '')
    print("reached flask", title, artist)

    res = jsonify(formulate_response(title,artist))
    
    return res

# old post method for searching a youtube song
# @app.route('/song',methods = ['GET', 'POST'])
# def get_stream():
#     # test url = "https://www.youtube.com/watch?v=fB8TyLTD7EE"
#     # print("Request::", request.form)
#     if request.method == 'POST':
#         songname = request.form['title']
#         authorname = request.form['artist']
#         url = search_youtube_url(songname, authorname)
#         print(url)

#         video = pafy.new(url)
#         audio = video.getbestaudio()
#         audio_url = audio.url
#         #audio = video.getbest()
#         return audio_url


#     else:
#         print("ERROR: fail to play song")
#     # search.html only for debugging, not associate with react yet
#     return render_template("index.html")


# starting point
if __name__ == '__main__':
    app.run()