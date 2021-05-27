# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

require 'faker'

2.times do |i|
    User.create(email: Faker::Internet.email, password: "password", password_confirmation: "password")
end

User.all.each do |u|
    10.times do |i|
        u.task_items.create(title: "Task Item #{i+1} for #{u.email}", description: Faker::Company.bs, complete: i % 3  == 0 ? true : false  )
    end
end