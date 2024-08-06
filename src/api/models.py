from flask_sqlalchemy import SQLAlchemy
from datetime import datetime, timezone
import enum

db = SQLAlchemy()


class PostStatus(enum.Enum):
    DRAFTED = "drafted"
    DELETED = "deleted"
    PUBLISHED = "published"


likes = db.Table('likes',
    db.Column('user_id', db.Integer, db.ForeignKey('user.id'), primary_key=True),
    db.Column('post_id', db.Integer, db.ForeignKey('post.id'), primary_key=True)
)

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    avatar = db.Column(db.String(120), nullable=True)
    name = db.Column(db.String(20),  nullable=False)
    surname = db.Column(db.String(20),  nullable=False)
    username = db.Column(db.String(10), unique=False, nullable=False)
    password = db.Column(db.String(80), nullable=False)
    salt = db.Column(db.String(90),  nullable=False)


    def __repr__(self):
        return f'<User {self.id}>'

    def __init__(self, name, surname, username, password, salt):
        
        self.name = name
        self.surname = surname
        self.username = username
        self.salt = salt
        self.password = password


    def serialize(self):
        return {
            
            "id": self.id,
            "avatar": self.avatar,
            "name": self.name,
            "surname": self.surname,
            "username": self.username,
            # do not serialize the password, its a security breach
        }
    

class Post(db.Model):
    id = db.Column(db.Integer, primary_key=True)

    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    user = db.relationship(User, backref='posts')

    date = db.Column(db.Date, nullable=False)
    image = db.Column(db.String(120), nullable=True)
    message = db.Column(db.String(255), nullable=True)
    likes = db.relationship('User', secondary=likes, backref=db.backref('liked_posts', lazy='dynamic'))
    author = db.relationship('User', backref=db.backref('authored_posts', lazy=True))
    created_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc), nullable=False)
    location = db.Column(db.String(120), nullable=True)
    status = db.Column(db.Enum(PostStatus), nullable=False)

    def __repr__(self):
        return f'<Post {self.id}>'

    def serialize(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "date": self.date.isoformat(),
            "image": self.image,
            "message": self.message,
            "likes": [user.id for user in self.likes],
            "author": self.user.serialize(),
            "created_at": self.created_at.isoformat(),
            "location": self.location,
            "status": self.status.value
        }