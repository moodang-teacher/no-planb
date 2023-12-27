$(function () {
  // 기본 동작 테스트
  // gsap.from('대상', {동작옵션})

  // 1. css 속성/값 적용
  // gsap.from('.logo', { transform: 'translateY(-100px)', opacity: 0 });

  // 2. gsap 속성/값 적용 & delay 조정으로 애니메이션 적용
  // gsap.from('.logo', { y: -100, autoAlpha: 0, duration: 0.5 });
  // gsap.from('nav', { y: -100, autoAlpha: 0, duration: 1, delay: 0.5 });
  // gsap.from('.menu', { y: -100, autoAlpha: 0, delay: 1.5 });

  // 3. 여러 요소를 내 마음대로 제어하고 싶으면 타임라인을 만들자!
  const TL = gsap.timeline();

  TL.from('nav > a', { y: -100, autoAlpha: 0, duration: 1, stagger: 0.1 });
  TL.from('.menu', { y: -100, autoAlpha: 0 });
  TL.from('.logo', {
    y: -100,
    autoAlpha: 0,
    duration: 0.5,
    ease: 'bounce.out',
  });

  TL.from('.foot-box', { width: 0, autoAlpha: 0 });
  TL.to('.logo', { rotation: 360, ease: 'none' /* repeat: -1, duration: 2 */ });
  TL.from('.sns-link li', { autoAlpha: 0, x: -50, stagger: 0.1 });
  TL.from('.copyright', { autoAlpha: 0 }, '<');

  TL.from('.bruce-lee-bg', { autoAlpha: 0, scale: 0.9, duration: 5, ease: 'none' }, 0);
  TL.from('.bruce-lee', { autoAlpha: 0, scale: 1.2, ease: 'power4.inOut' });
  TL.from('.title h2 strong', { x: -50, autoAlpha: 0, duration: 1 });
  TL.from(
    '.title h2 span',
    {
      x: -50,
      autoAlpha: 0,
      duration: 1,
      onComplete: () => Splitting(),
    },
    '-=.8'
  );

  TL.from('.small-bruce-lee', {
    xPercent: 200,
    duration: 0.7,
    ease: 'elastic.out(1,0.3)',
    onComplete: () => {
      $('.small-bruce-lee').addClass('action');
      animate();
    },
  });
  // TL.add('end');
  TL.addLabel('end');

  // 작은 이소룡을 클릭하면 소리지르게
  const screamSound = $('.scream').get(0);
  // console.log(screamSound);

  $('.small-bruce-lee').on('click', () => screamSound.play());
  $('.logo').on('click', () => {
    TL.seek('end');
    $('.small-bruce-lee').addClass('action');
    animate();
  });

  // 부드러운 움직임 구현
  const $window = $(window);

  // 마우스 좌표값
  let x = 0;
  let y = 0;

  // 보정되는 마우스 좌표값
  let mx = 0;
  let my = 0;
  let speed = 0.08;

  function animate() {
    mx += (x - mx) * speed;
    my += (y - my) * speed;

    $('.bruce-lee').css({
      transform: `translate(${mx}px, 0px)`,
    });
    $('.bruce-lee-bg').css({
      transform: `translate(${-mx}px, ${-my}px)`,
    });
    $('.title').css({
      transform: `translate(-${mx * 0.7}px, -50%)`,
    });

    requestAnimationFrame(animate);
  }

  $(window).on('mousemove', function (e) {
    // mx += (x - mx) * speed;
    // my += (y - my) * speed;

    // x = e.pageX - $window.innerWidth() / 2;
    // y = e.pageY - $window.outerHeight() / 2;
    x = Math.max(-100, Math.min(200, e.pageX - $window.innerWidth() / 2)); // Math.min(a, b) 둘 중에서 작은값 --> -960 ~ 200 -- Math.max(100, ddd) 둘 중에서 큰 값 --> 200 --- 최소 -100, 최대 200
    y = Math.max(-10, Math.min(100, e.pageY - $window.outerHeight() / 2)); // 최소 0부터 최대 100까지

    // console.log(x, y);
  });
});
