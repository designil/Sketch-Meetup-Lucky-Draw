$(document).ready(function() {
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
  });
});