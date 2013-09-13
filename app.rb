require 'sinatra'
require 'data_mapper'

#DataMapper::Model.raise_on_save_failure = true

# Settings

$app_name = "What Tasks You?"


# Routes

get '/' do
	@title = "All Tasks"
	@tasks = Task.all

	erb :index
end

post '/' do
	new_task = Task.new
		new_task.title = params[:title]
		new_task.description = params[:description]
		new_task.created_at = Time.now
	new_task.save

	redirect '/'
end

# Models

DataMapper::setup(:default, "sqlite3://#{Dir.pwd}/db/db.sqlite3")

class Task
  include DataMapper::Resource
	property :id, Serial, :key => true
	property :title, String
	property :description, Text
	property :finished, Boolean
	property :created_at, DateTime
	property :finished_at, DateTime

end

DataMapper.finalize.auto_upgrade!  