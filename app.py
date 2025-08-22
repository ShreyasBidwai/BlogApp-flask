
from flask import Flask, render_template, request, redirect, flash, session
import os
from werkzeug.utils import secure_filename
from flask_sqlalchemy import SQLAlchemy
import bcrypt


app = Flask(__name__)
UPLOAD_FOLDER = os.path.join('static', 'upload')
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER


app.config['SQLALCHEMY_DATABASE_URI'] = "mysql+mysqlconnector://blogUser:bloguser@localhost/registrationDB?charset=utf8mb4"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
app.secret_key='secret_key'

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    password = db.Column(db.String(100), nullable=False)

    def __init__(self, name, email, password):
        self.name = name
        self.email = email
        self.password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')

    def check_password(self, password):
        return bcrypt.checkpw(password.encode('utf-8'), self.password.encode('utf-8'))

class Blog(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    img = db.Column(db.String(200), nullable=True)
    category =db.Column(db.String(50), nullable=False)
    content = db.Column(db.Text, nullable=False)
    author_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)

    author = db.relationship('User', backref=db.backref('blogs', lazy=True))



with app.app_context():
    db.create_all()

@app.route('/')
def home():
    return render_template('home.html')


def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/submitBlog', methods=['POST'])
def submitBlog():
    if session.get('name'):
        title = request.form['title']
        content = request.form['content']
        category = request.form['category']
        author_id = session.get('user_id')
        img_path = None

        if 'img' in request.files:
            img_file = request.files['img']
            if img_file and allowed_file(img_file.filename):
                filename = secure_filename(img_file.filename)
                save_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
                os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)
                img_file.save(save_path)
                img_path = save_path

        new_blog = Blog(title=title, content=content, author_id=author_id,category=category, img=img_path)
        db.session.add(new_blog)
        db.session.commit()
        return redirect('/publishedBlogs')
    else:
        return redirect('/login')
    
    
@app.route('/readBlogs')
def readBlogs():
    # Get all blogs, newest first
    blogs = Blog.query.order_by(Blog.id.desc()).all()
    return render_template('readBlogs.html', blogs=blogs)

@app.route('/publishedBlogs')
def publishedBlogs():
    if session.get('name'):
        user_id = session.get('user_id')
        # Get all blogs from this user, newest first
        blogs = Blog.query.filter_by(author_id=user_id).order_by(Blog.id.desc()).all()
        return render_template('publishedBlogs.html', blogs=blogs)
    else:
        return redirect('/login')


@app.route('/createBlog')
def createBlog():
    if session.get('name'):
        return render_template('createBlog.html')
    else:
        return redirect('/login')



@app.route('/blog/<int:blog_id>')
def read_single_blog(blog_id):
    blog = Blog.query.get_or_404(blog_id)
    return render_template('singleBlog.html', blog=blog)

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method=='POST':
        email = request.form['email']
        password = request.form['password']

        user = User.query.filter_by(email=email).first()

        if user and user.check_password(password):
            session['name']=user.name
            session['email']=user.email
            session['user_id'] = user.id 
            session['name'] = user.name

            flash('Login Successful!')
            login_success=True
            return redirect('/createBlog')

        flash('Invalid email or password!')
    else:
        login_success = False
    return render_template('login.html', )

@app.route('/logout', methods=['POST'])
def logout():
    session.clear()
    flash('Logged out successfully!')
    return redirect('/')

@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        name = request.form['name']
        email = request.form['email']
        password = request.form['password']

        existing_user = User.query.filter_by(email=email).first()
        if existing_user:
            return "User already exists", 400

        new_user = User(name=name, email=email, password=password)
        db.session.add(new_user)
        db.session.commit()
        flash('Registration Successful! Please Login')
        return redirect('/login')
        
    return render_template('register.html')

if __name__ == '__main__':
    app.run(debug=True)
