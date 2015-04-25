$(document).ready(function() {
  // CAUTION: Use "" for namelist !! (some names use ')
  // namelist = list of attendees from CSV
  var namelist = "Akekapon Sangsai,Alongkorn Pornpoung,Apichart Khumtoon,Apichart Kohdee,Apisake Hongwitayakorn,Aria Arancia Langley,armariya,Armkung Suttichai,Arnon Ph,Arny Kimarteuk,Aru Bub,Asawin Mahotan,Atikom Laowsil,Benz Tanaratta,Berrii Bui,Bow Kraivanich,Budsayamas Jickabyte Ruangcharoe,BugNUT Design,BunaZz Rmutt,Buntana Chinta,Buzz Uaremorn,Chaiyaporn Belovely,Chaiyapruck Vachi,Chaiyarat Soontornprapee,Chaiyos YoShii,Chakkrisn Menn Talawat,chanachon promsak,Chanaphat Plearns Iamsrithong,Charkrid Thanhachartyothin,Chawanan Inkumnoi,Chayut Maneethai,Chonlathep Phosaithong,Daedear Chisawatanawanij,Daruma Tk,DEv Huuluuluu,Dev Xus,Dusit Neramit-aram,Eakchai Vasukraipaisarn,ʚḯɞ Baifern ʚḯɞ,Fareast Binsteera,Fern Wongngamkam,geensport,Genz RW,Golfz Surattikorn Chumkaew,IGolf Gt,inhumba,Ittipol Kaewprasert,Jabont Chamikorn,James Quek,Jesse Winchester,Jirayu Chamamahattana,Job Ster,JsPor K.,Kai,Kanyapat Seneewong,Karun Jaraslertsuwan,Khwanjira Cake Krathaykhwan,Kiatbanjong Chawnan,Kiim MK,Kitti Pariyaowknakun,Kittikun Kamrai,Kritsana Yuenyong,kuzer,Lahphim S. Arnon,Lamduan PrinCharat,Lattapon Yodsuwan,LinPing ChubChay,Manesz Satitnimankan (MICK),Matt Tortong Tonglor,Maykin Warasart,Mildiot Chaikiettiyot,Mintra Maru,Monkeys Pui,Nannalin Leankamnead,Narakorn Hirunyaphak,Nat Kansuwan,nattapon,Nawanun Pantisawas,Nicha Onnum,Niphon Jobsri,Nirattisai Jutapong,Nitisak Mooltreesri,No-Te Eksarunchai,Nongpanga Suwannasorn,Nonpawit Teerachetmongkol,Noom Narze,Nueng Wdv,Nunteema Supapon,NuTz,Oath Voravong,Oravee S.,Panjapol Chiemsombat,Panwat S,PaperJam Pammon,Passawon yamyuen,PATCHARA PATTANAKIMHUN,Patcharaporn Chaichuangchot,Patompong Pundee,Peraya S.,Petch Chaima,Pete Chuenprayoth,phawee,Phor Ketwongwiriya,Phuriwat Kun,Pirun Tirapibal,Pixel Paradise,Piyapong Hawj,polygonstudio,Pongsatorn Pipattham,Poom Laupattarakasem,Poramate Minsiri,Pussaaon Jungjatuporn,ray,Rutchawadee Virutchakul,Sally Mam,Samphan Sittiwantana,Sappawish Siripon,Sarah Blowers,sarun,Sarun Pinyarat,Sarunsak Phonwa,sasawat,Sittitsak Jiampotjaman,Somkamol Vasuvudhiroch,Sukrit Jitshob,Supanut Kmutnb,Supattra Saekow,SuperPad's Roddara,Sutinai Jaradwilaswanit,Suwitcha Sugthana,Svl2Nuk3,Tanasit Niyomsat,Tanet Arunthavornwong,Tarn Natnaree,Teedej Wara-asawapati,Teerawat Chanapai,Thanachot Wisuttismarn,Thitima,Tom Tom,tommykung007,Ukrid Krid Rorkib,Vichita Fongmala,Waleeporn Sukcharenporn,Wasin Kachapri (George),Wasit Jingjit,Watcharapong Kapongpang Wongwiwa,winadda,Wishaya Piyasirisin,Woraphon Tontaweewong,Woratana Perth,Worawoot Yoosawas,Xinming Zhao,Yai Pang Rum,Yugi5002";
  
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

        var charchosen_string = charchosen[0] + '... ^600' + charchosen[1] + '... ^600' + charchosen[2] + '... ^400';

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