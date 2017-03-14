 var createSongRow = function(songNumber, songName, songLength) {
     var template =
        '<tr class="album-view-song-item">'
      + '  <td class="song-item-number" data-song-number="' + songNumber + '">' + songNumber + '</td>'
      + '  <td class="song-item-title">' + songName + '</td>'
      + '  <td class="song-item-duration">' + songLength + '</td>'
      + '</tr>'
      ;
 
     var $row = $(template);

     $row.find('.song-item-number').click(clickHandler);
    
     $row.hover(onHover, offHover);
    
     return $row;
 };   
    
     var clickHandler = function() {
         var songNumber = parseInt($(this).attr('data-song-number'));

	if (currentlyPlayingSongNumber !== null) {
	
		var currentlyPlayingCell =  parseInt($('.song-item-number[data-song-number="' + currentlyPlayingSongNumber + '"]'));
		currentlyPlayingCell.html(currentlyPlayingSongNumber);
	}
	if (currentlyPlayingSongNumber !== songNumber) {
		// Switch from Play -> Pause button to indicate new song is playing.
		$(this).html(pauseButtonTemplate);
		currentlyPlayingSongNumber = songNumber;
        currentSongFromAlbum = currentAlbum.songs[songNumber - 1];
        updatePlayerBarSong();
	} else if (currentlyPlayingSongNumber === songNumber) {
		// Switch from Pause -> Play button to pause currently playing song.
		$(this).html(playButtonTemplate);
        $('.main-controls .play-pause').html(playerBarPlayButton);
		currentlyPlayingSongNumber = null;
        currentSongFromAlbum = null;
        
	}
};
   
                  
    var onHover = function(event) {
        var songNumberCell = $(this).find('.song-item-number');
        var songNumber = parseInt(songNumberCell.attr('data-song-number'));

        if (songNumber !== currentlyPlayingSongNumber) {
            songNumberCell.html(playButtonTemplate);
        }
     };
   
     var offHover = function(event) {
        var songNumberCell = $(this).find('.song-item-number');
        var songNumber = parseInt(songNumberCell.attr('data-song-number'));

        if (songNumber !== currentlyPlayingSongNumber) {
            songNumberCell.html(songNumber);
        }
       
       console.log("songNumber type is " + typeof songNumber + "\n and currentlyPlayingSongNumber type is " + typeof currentlyPlayingSongNumber);
     };
       
   

var setCurrentAlbum = function (album) {
 
  var $albumTitle = $('.album-view-title');
  var $albumArtist = $('.album-view-artist');
  var $albumReleaseInfo = $('.album-view-release-info');
  var $albumImage = $('.album-cover-art');
  var $albumSongList = $('.album-view-song-list');
  
  $albumTitle.text(album.title);
  $albumArtist.text(album.artist);
  $albumReleaseInfo.text(album.year + ' ' + album.label);
  $albumImage.attr('src', album.albumArtUrl);
  
  $albumSongList.empty();
  
  for (var i = 0; i < album.songs.length; i++) {
    var $newRow = createSongRow(i + 1, album.songs[i].title, album.songs[i].duration);
    $albumSongList.append($newRow);
  }
};

var trackIndex = function(album, song) {
     return album.songs.indexOf(song);
 };





var playButtonTemplate = '<a class= "album-song-button"><span class="ion-play"></span></a>';

var pauseButtonTemplate = '<a class="album-song-button"><span class="ion-pause"></span></a>';

var playerBarPlayButton = '<span class="ion-play"></span>';
 var playerBarPauseButton = '<span class="ion-pause"></span>';

var currentAlbum = null;
var currentlyPlayingSongNumber = null;
var currentSongFromAlbum = null;
var $previousButton = $('.main-controls .previous');
var $nextButton = $('.main-controls .next');


$(document).ready(function() {
  setCurrentAlbum(albumPicasso);
  $previousButton.click(prevSong);
  $nextButton.click(nextSong);
  });
  
  var albums = [albumPicasso, albumMarconi];
  var index = 0;

  $('.album-cover-art').click(function(event) {
    setCurrentAlbum(albums[index]);
    index ++;
    if (index == albums.length) {
      index = 0;
    }
  });
 
var nextSong = function () {
  //identify previous song
  var getLastSongNum = function(index){
    return index == 0 ? currentAlbum.songs.length : index;
  };

  //use trackIndex() to get the index of current song and increment value
  var currentSongIndex = trackIndex(currentAlbum, currentSongFromAlbum);
  currentSongIndex++;
  //set new current song to currentSongFromAlbum
  if (currentSongIndex >= currentAlbum.songs.length){
    currentSongIndex = 0;
  }
  
  currentlyPlayingSongNumber = currentSongIndex + 1;
  currentSongFromAlbum = currentAlbum.songs[currentSongIndex];
  
  //Update the player bar to show the new song
  updatePlayerBarSong();

    var lastSongNum = getLastSongNum(currentSongIndex);
    var $nextSongNumberCell = parseInt($('.song-item-number[data-song-number="' + currentlyPlayingSongNumber + '"]'));
    var $lastSongNumCell = parseInt($('.song-item-number[data-song-number="' + lastSongNum + '"]'));

  
  //update the HTML of the previous song's .song-item-number element with a number
     
    $lastSongNumCell.html(lastSongNum);


  //Update the HTML of the new song's .song-item-number element with a pause button
  
   $nextSongNumberCell.html(pauseButtonTemplate);
};

var prevSong = function() {
  var getLastSongNum = function(index) {
  return index == (currentAlbum.songs.length-1) ? 1 : index + 2;
};

var currentSongIndex = trackIndex(currentAlbum, currentSongFromAlbum);
currentSongIndex--;

if (currentSongIndex < 0) {
  currentSongIndex = currentAlbum.songs.length - 1;
}

currentlyPlayingSongNumber = currentSongIndex + 1;
    currentSongFromAlbum = currentAlbum.songs[currentSongIndex];

updatePlayerBarSong();

    $('.main-controls .play-pause').html(playerBarPauseButton);

    var lastSongNum = getLastSongNum (currentSongIndex);
    var $prevSongNumCell = parseInt($('.song-item-number[data-song-number="' + currentlyPlayingSongNumber + '"]'));
    var $lastSongNumCell = parseInt($('.song-item-number[data-song-number="' + lastSongNumber + '"]'));

    $prevSongNumCell.html(pauseButtonTemplate);

};

var updatePlayerBarSong = function() {
   $('.currently-playing .song-name').text(currentSongFromAlbum.title);
    $('.currently-playing .artist-name').text(currentAlbum.artist);
    $('.currently-playing .artist-song-mobile').text(currentSongFromAlbum.title + " | " + currentAlbum.artist);
};

$('.main-controls .play-pause').html(playerBarPauseButton);