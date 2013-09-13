require 'sinatra'
require 'data_mapper'

#DataMapper::Model.raise_on_save_failure = true

# Settings

$app_name = "What Tasks You?"


# Routes

get '/' do
	@title = "All Tasks"
	@tasks = Task.all(:order => [ :created_at.desc ])

	erb :index
end

post '/' do
	@new_task = Task.new
		@new_task.title = params[:title]
		@new_task.description = params[:description]
		@new_task.created_at = Time.now
		@new_task.finished = false
	@new_task.save

	redirect '/'
end

get '/edit/:id' do

	@update_task = Task.get( params[:id] )
	@update_task.update( :finished => params[:finished] )

	"Saved!" if @update_task.saved?
end

post '/edit/:id' do

	@update_task = Task.get( params[:id] )
	@update_task.update( :finished => params[:finished] )

	"Saved!" if @update_task.saved?
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