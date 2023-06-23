# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)


# Clear existing data
Post.destroy_all
Comment.destroy_all
Like.destroy_all

# Create users
alice = User.create(email: 'alice@example.com', password: 'password', full_name: 'Alice Michel', avatar_url: 'https://i.pravatar.cc/150?u=a042581f4e2')
bob = User.create(email: 'bob@example.com', password: 'password', full_name: 'Bob Smith', avatar_url: 'https://i.pravatar.cc/150?u=a042581f4e2ff')
charlie = User.create(email: 'charlie@example.com', password: 'password', full_name: 'Charlie Brown', avatar_url: 'https://i.pravatar.cc/150?u=a042581f4e2ffg')

# Create posts for Alice
alice_post1 = alice.created_posts.create(
  title: 'The beauty of nature',
  body: 'Nature is full of beauty and wonder.',
  image_url: 'https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg'
)
alice_post2 = alice.created_posts.create(
  title: 'A beautiful sunset',
  body: 'There is nothing quite like watching the sun set over the horizon.',
  image_url: 'https://images.pexels.com/photos/1237119/pexels-photo-1237119.jpeg'
)
alice_post3 = alice.created_posts.create(
  title: 'A majestic mountain',
  body: 'The sight of a majestic mountain never fails to take my breath away.',
  image_url: 'https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg'
)
alice_post4 = alice.created_posts.create(
  title: 'A serene lake',
  body: 'The calm waters of a serene lake are the perfect place to find peace and tranquility.',
  image_url: 'https://images.pexels.com/photos/235621/pexels-photo-235621.jpeg'
)
alice_post5 = alice.created_posts.create(
  title: 'A vibrant cityscape',
  body: 'The vibrant energy of a bustling cityscape is truly exhilarating.',
  image_url: 'https://images.pexels.com/photos/374870/pexels-photo-374870.jpeg'
)

# Create posts for Bob
bob_post1 = bob.created_posts.create(
  title: 'Exploring the great outdoors',
  body: 'There is nothing like exploring the great outdoors and experiencing nature up close.',
  image_url: 'https://images.pexels.com/photos/235621/pexels-photo-235621.jpeg'
)
bob_post2 = bob.created_posts.create(
  title: 'A tranquil forest',
  body: 'The tranquil beauty of a forest is the perfect escape from the hustle and bustle of daily life.',
  image_url: 'https://images.pexels.com/photos/459225/pexels-photo-459225.jpeg'
)
bob_post3 = bob.created_posts.create(
  title: 'A stunning beach',
  body: 'The sound of the waves crashing against the shore and the feel of the sand between my toes is truly invigorating.',
  image_url: 'https://images.pexels.com/photos/457882/pexels-photo-457882.jpeg'
)
bob_post4 = bob.created_posts.create(
  title: 'A peaceful meadow',
  body: 'The sight of a peaceful meadow filled with wildflowers is truly breathtaking.',
  image_url: 'https://images.pexels.com/photos/36717/amazing-animal-beautiful-beautifull.jpg'
)
bob_post5 = bob.created_posts.create(
  title: 'A charming village',
  body: 'The charm and character of a quaint village is truly enchanting.',
  image_url: 'https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg'
)

# Create posts for Charlie
charlie_post1 = charlie.created_posts.create(
  title: 'The calming effect of nature',
  body: 'Spending time in nature has a calming and rejuvenating effect on the mind and body.',
  image_url: 'https://images.pexels.com/photos/459225/pexels-photo-459225.jpeg'
)
charlie_post2 = charlie.created_posts.create(
  title: 'A magnificent waterfall',
  body: 'The power and beauty of a magnificent waterfall is truly awe-inspiring.',
  image_url: 'https://images.pexels.com/photos/1559116/pexels-photo-1559116.jpeg'
)
charlie_post3 = charlie.created_posts.create(
  title: 'A colorful garden',
  body: 'The vibrant colors and fragrant scents of a beautiful garden are truly delightful.',
  image_url: 'https://images.pexels.com/photos/36764/marguerite-daisy-beautiful-beauty.jpg'
)
charlie_post4 = charlie.created_posts.create(
  title: 'A charming village',
  body: 'The charm and character of a quaint village is truly enchanting.',
  image_url: 'https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg'
)
charlie_post5 = charlie.created_posts.create(
  title: 'A vibrant cityscape',
  body: 'The vibrant energy of a bustling cityscape is truly exhilarating.',
  image_url: 'https://images.pexels.com/photos/374870/pexels-photo-374870.jpeg'
)

# Create comments
comment1 = alice_post1.comments.create(user: bob, body: 'I completely agree!')
comment2 = alice_post1.comments.create(user: charlie, body: 'Nature is truly amazing.')
comment3 = bob_post1.comments.create(user: alice, body: 'I love going on hikes and exploring new places.')
comment4 = bob_post1.comments.create(user: charlie, body: 'The great outdoors is full of adventure.')
comment5 = charlie_post1.comments.create(user: alice, body: 'Nature has a way of calming the mind and reducing stress.')
comment6 = charlie_post1.comments.create(user: bob, body: 'I always feel refreshed after spending time in nature.')

# Create likes
like1 = alice_post1.likes.create(user: bob)
like2 = alice_post1.likes.create(user: charlie)
like3 = bob_post1.likes.create(user: alice)
like4 = bob_post1.likes.create(user: charlie)
like5 = charlie_post1.likes.create(user: alice)
like6 = charlie_post1.likes.create(user: bob)
