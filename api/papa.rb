require 'sinatra'
require 'json'
require "sinatra/config_file"
require 'sinatra/cross_origin'

  set :bind, '0.0.0.0'
  configure do
    enable :cross_origin
  end
  before do
    response.headers['Access-Control-Allow-Origin'] = '*'
  end
  
  options "*" do
    response.headers["Allow"] = "GET, POST, OPTIONS"
    response.headers["Access-Control-Allow-Headers"] = "Authorization, Content-Type, Accept, X-User-Email, X-Auth-Token"
    response.headers["Access-Control-Allow-Origin"] = "*"
    200
  end

not_found do
  status 404
  # TODO send a beautiful JSON here
  "Not found"
end

post '/rosters' do
  roster = JSON.parse(request.body.read)
  # TODO shuffle and return a list like
  # {
  #   "gifter": "Juan",
  #   "giftee": "Agus"
  # }
  # within a Roster entity. Or whatever
  puts "I got some JSON: #{roster.inspect}"
end

# TODO I don't think this works right now, but do we agree we need this API?
get('/rosters/:roster_id/gifters/:gifter_id/giftee') do
  puts "Return #{params[:gifter_id]}'s giftee (for Roster #{params[:roster_id]})"
end
