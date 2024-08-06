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
    avatar = db.Column(db.String(120), unique=False, nullable=False)
    name = db.Column(db.String(20), unique=False, nullable=False)
    sur_name = db.Column(db.String(20), unique=False, nullable=False)
    user_name = db.Column(db.String(10), unique=False, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)
    salt = db.Column(db.String(90), unique=False, nullable=False)


    def __repr__(self):
        return f'<User {self.id}>'

    def __init__(self, avatar, name, sur_name, user_name, password, salt):
        self.avatar = avatar
        self.name = name
        self.sur_name = sur_name
        self.user_name = user_name
        self.salt = salt
        self.set_password(password)

    def set_password(self, password):
        if len(password) < 5 or len(password) > 10:
            raise ValueError("Password must be between 5 and 10 characters")
        self.password = password

    def serialize(self):
        return {
            
            "id": self.id,
            "avatar": self.avatar,
            "name": self.name,
            "sur_name": self.sur_name,
            "user_name": self.user_name,
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