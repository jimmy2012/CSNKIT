recommends
// "username", "avatar", "title", "desc"

ratelogs
// "name", "rate", "code", "start", "end", "ratime"

favs
// "noteId", "favtime"

orders
// "noteId", "account", "settle", "ordertime"

user
-- --note
-- -- -- --chapter
-- -- -- -- -- --message
-- -- -- -- -- -- -- --comment

banner

guide

tag

cover
-- --note

user
-- --txlog


========================================= new =========================================
User
	=> Comment
	=> Message
	=> Note
	=> Recommend
	=> Txlog

Banner

Guide	=> Tag

Note
	=> Chapter
		=> Message
			=> Comment
	-> Cover
	=> Recommend
	=> Tag
	=> Txlog



User	Recommend	Message	Comment	Guide	Txlog	Note	Banner	Tag	Cover	Chapter
