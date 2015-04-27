$(document).ready(function() {
  // CAUTION: Use "" for namelist !! (some names use ')
  // namelist = list of attendees from CSV
  var namelist = "Adirut Nithilerdviwat,Akekapon Sangsai,Apichart Kohdee,Aria Arancia Langley,Armkung suttichai,Atikom Laowsil,Buzz Uaremorn,Chaiyapruck  Vachi,Chaiyarat Soontornprapee,Chaiyos YoShii,chanachon promsak,Chayut Maneethai,Chonlathep Phosaithong,Daedear Chisawatanawanij,Dusit Neramit-aram,Ekkamol,Fern Wongngamkam,IGolf Gt,inhumba,Ittipol Kaewprasert,James Quek,Jesse Winchester,Jirayu  Chamamahattana,Kanyapat Seneewong,Karun Jaraslertsuwan,Khemmachart  Chrdapetch,Khwanjira Cake Krathaykhwan,Kiim MK,Kitti Pariyaowknakun,Kittikun Kamrai,Kodwarunsayar  wongpuriselt,Linda  Kraivanich,LinPing ChubChay,Nannalin Leankamnead,Narakorn hirunyaphak,nattapon,Niphon Jobsri,Nirattisai Jutapong,Nonpawit  Teerachetmongkol,Noppadol  sungum,Oath Voravong,Panjapol Chiemsombat,Pantira  Aswakiatkajorn,Panwat S,PaperJam Pammon,Passawon yamyuen,PATCHARA PATTANAKIMHUN,Patcharaporn Chaichuangchot,Petch Chaima,phawee,Phuriwat Kun,polygonstudio,Poohdish rattanavijai,Rutchawadee Virutchakul,Samphan Sittiwantana,Sarah Blowers,Sarun Pinyarat,sasawat  charurat,Sirinart   mankaew,Sittitsak Jiampotjaman,Sund vijitsation,Supattra Saekow,Svl2Nuk3,Teedej Wara-asawapati,Teeravit tanpungchoey,Thanaporn   waikawee,Vichita Fongmala,Waleeporn Sukcharenporn,Warunee chetchianyong,Wasin Kachapri (George),winadda,Patcharee  pusiringarmgrakul,wuranit  rath,sumpom juairot,saharat  petcharayupan,anuponung tongsumbath";
  
  // winner_count = Number of prize
  var winner_count = 2;

  var audio = new Audio('sound/tantan.mp3');
  audio.addEventListener('canplaythrough', function() {
    $('.button').css('display', 'inline-block');
  }, false);

  var nameary = namelist.split(',');

  /* Random 2 Lucky Person */
  var namechosen_id = [];
  var namechosen = [];
  while(namechosen.length < winner_count) {
    var n = Math.floor(Math.random() * nameary.length);
    if (namechosen_id.indexOf(n) == -1) {
      namechosen_id.push(n);
      namechosen.push( nameary[n] );
      $('.namelist ol').append('<li>' + nameary[n] + '</li>')
    }
  }

  /* Particle */
  var proton;
  var renderer;
  var stats;
  var canvas;
  var context;

  Main();
  function Main() {
    canvas = document.getElementById("testCanvas");
    canvas.width = 600;
    canvas.height = 600;

    createProton();
    tick();
  }

  function createProton() {
    proton = new Proton;
    createImageEmitter();

    renderer = new Proton.Renderer('webgl', proton, canvas);
    renderer.blendFunc("SRC_ALPHA", "ONE");
    renderer.start();
  }

  function createImageEmitter() {
    var emitter = new Proton.Emitter();
    emitter.rate = new Proton.Rate(new Proton.Span(5, 10), new Proton.Span(.05, .2));
    emitter.addInitialize(new Proton.Mass(1));
    emitter.addInitialize(new Proton.Life(2, 4));
    emitter.addInitialize(new Proton.ImageTarget(['img/particle.png'], 32));
    emitter.addInitialize(new Proton.Radius(10));
    emitter.addInitialize(new Proton.V(new Proton.Span(0.5, 1.5), new Proton.Span(0, 360), 'polar'));
    emitter.addBehaviour(new Proton.Alpha(1, 0));
    emitter.addBehaviour(new Proton.Color('#E38F5C', '#FFFFFF'));
    emitter.addBehaviour(new Proton.Scale(Proton.getSpan(0.3, 4), 0));
    emitter.addBehaviour(new Proton.CrossZone(new Proton.RectZone(0, 0, 600, 600), 'dead'));
    emitter.p.x = canvas.width / 2;
    emitter.p.y = canvas.height / 2;
    emitter.rotation = 48;
    emitter.emit();
    proton.addEmitter(emitter);
  }

  function tick() {
    requestAnimationFrame(tick);
    proton.update();
  }

  /* Start Button */
  $('#start').on('click', function() {
    $('.wrapper').addClass('animate');

    // Play song
    audio.play();

    $('.namebox').empty().append('<span class="nameboxtype"></span>');
    $(".nameboxtype").typed({
      strings: ["...^1000 ไหนดูซิ ...^2000"],
      typeSpeed: 60,
      callback: function() {

        thisname = namechosen.pop();
        var thisname_sub = thisname.replace(' ', '').replace('-', '').replace('(', '').replace(')', '');

        console.log(thisname, thisname_sub);

        // Random 3 Characters from name
        var charchosen_id = [];
        var charchosen = [];
        while(charchosen.length < 3) {
          var n = Math.floor(Math.random() * thisname_sub.length);
          if (charchosen_id.indexOf(n) == -1) {
            charchosen_id.push(n);
            charchosen.push( thisname_sub[n] );
          }
        }

        var charchosen_string = charchosen[0] + '... ^600' + charchosen[1] + '... ^600' + charchosen[2] + '... ^2400';

        $('.namebox').empty().append('<span class="nameboxtype"></span>');
        $(".nameboxtype").typed({
          strings: [charchosen_string],
          typeSpeed: 100,
          callback: function() {
            // Show Answer
            $('.namebox').addClass('show').empty().text(thisname);
            $('.logo').addClass('explode');
          }
        });

        $('.namebox').on('click', function() {
          // Reset Everything Back
          $('.wrapper').removeClass('animate');
          $('.namebox').removeClass('show');
          $('.logo').removeClass('explode');

          if(namechosen.length == 0) {
            console.log('end');
            $('.wrapper').addClass('end');
          }
        });

      }
    });


  });
});