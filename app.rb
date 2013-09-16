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
  @update_task.update( :finished => params[:finished], :finished_at => Time.now )

  "This shall task you no longer." if @update_task.saved?
end

post '/edit/:id' do

  @update_task = Task.get( params[:id] )
  @update_task.update( :finished => params[:finished] )
  @update_task.update( :finished => params[:finished], :finished_at => Time.now )

  @finished = params[:finished]

  if @finished == 'true' && @update_task.saved? then 
    puts "This shall task you no longer"
    "This shall task you no longer."

  elsif @finished == 'false' && @update_task.saved? then
    puts "This shall plague you for eternity."
    "This shall plague you for eternity."

  else
    puts "Finished? #{@finished}. Updated? #{@update_task.saved?}"
    "Finished? #{@finished}. Updated? #{@update_task.saved?}"

  end

end

post '/archive/:id' do
  @archived_task = Task.get( params[:id] )
  @archived_task.update( :archived => true )

  if @archived_task.saved? then

    "This task has been archived."

  else

    "There was an error"

  end

end

post '/delete/:id' do

  @deleted_task = Task.get( params[:id] )
  @deleted_task.destroy

  if @deleted_task.destroyed? == true then

    "The task has been deleted."

  else

    "The task was not deleted."

  end


end

# Models

DataMapper::setup(:default, "sqlite3://#{Dir.pwd}/db/db.sqlite3")

class Task
  include DataMapper::Resource
  property :id, Serial, :key => true
  property :title, String
  property :description, Text
  property :finished, Boolean, :default => false
  property :created_at, DateTime
  property :finished_at, DateTime
  property :archived, Boolean, :default => false

end

DataMapper.finalize.auto_upgrade!  