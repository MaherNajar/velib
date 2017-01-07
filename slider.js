function affichage() {
        var total = $('.item').length;
        var current = $('.item.active').index() + 1;
        $('.label').text(current + ' / '+ total);
      }
      $(function () {
        affichage();
        $('.carousel').carousel({ interval: 2000 });
        $('#first').click(function() { $('.carousel').carousel(0); });
        $('#previous').click(function() { $('.carousel').carousel('prev'); }); 
        $('#pause').click(function() { $('.carousel').carousel('pause'); });
        $('#play').click(function() { $('.carousel').carousel('cycle'); });
        $('#next').click(function() { $('.carousel').carousel('next'); });
        $('#last').click(function() { $('.carousel').carousel(2); });
        $('.carousel').on('slid.bs.carousel', function () {
          affichage();
        });
      });