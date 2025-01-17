"""empty message

Revision ID: 6b8299d00d2a
Revises: 914aee2cd390
Create Date: 2024-08-05 23:32:24.673806

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '6b8299d00d2a'
down_revision = '914aee2cd390'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('post',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('date', sa.Date(), nullable=False),
    sa.Column('image', sa.String(length=120), nullable=True),
    sa.Column('message', sa.String(length=255), nullable=True),
    sa.Column('created_at', sa.DateTime(), nullable=False),
    sa.Column('location', sa.String(length=120), nullable=True),
    sa.Column('status', sa.Enum('DRAFTED', 'DELETED', 'PUBLISHED', name='poststatus'), nullable=False),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('likes',
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('post_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['post_id'], ['post.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], ),
    sa.PrimaryKeyConstraint('user_id', 'post_id')
    )
    with op.batch_alter_table('user', schema=None) as batch_op:
        batch_op.add_column(sa.Column('avatar', sa.String(length=120), nullable=False))
        batch_op.add_column(sa.Column('name', sa.String(length=20), nullable=False))
        batch_op.add_column(sa.Column('sur_name', sa.String(length=20), nullable=False))
        batch_op.add_column(sa.Column('user_name', sa.String(length=10), nullable=False))
        batch_op.drop_constraint('user_email_key', type_='unique')
        batch_op.drop_column('email')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('user', schema=None) as batch_op:
        batch_op.add_column(sa.Column('email', sa.VARCHAR(length=120), autoincrement=False, nullable=False))
        batch_op.create_unique_constraint('user_email_key', ['email'])
        batch_op.drop_column('user_name')
        batch_op.drop_column('sur_name')
        batch_op.drop_column('name')
        batch_op.drop_column('avatar')

    op.drop_table('likes')
    op.drop_table('post')
    # ### end Alembic commands ###
