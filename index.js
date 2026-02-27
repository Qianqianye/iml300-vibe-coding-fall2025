$(function () {
  const eyebrow = $('.landing-eyebrow');
  const heading = $('.landing-heading');

  const EYEBROW_SPEED = 40;
  const HEADING_SPEED = 60;
  const LINE_PAUSE    = 300;
  const BLOCK_PAUSE   = 400;

  function addCursor($el) {
    $('<span class="typing-cursor"></span>').appendTo($el);
  }

  function removeCursor($el) {
    $el.find('.typing-cursor').remove();
  }

  function typeInto($el, text, speed, done) {
    let i = 0;
    function tick() {
      if (i < text.length) {
        $el.find('.typing-cursor').before(document.createTextNode(text[i++]));
        setTimeout(tick, speed);
      } else {
        if (done) done();
      }
    }
    tick();
  }

  // Read from data attributes
  const line1 = eyebrow.data('line1');
  const line2 = eyebrow.data('line2');

  const textBefore = heading.data('text');
  const linkText   = heading.data('link-text');
  const linkHref   = heading.data('link-href');
  const textAfter  = heading.data('text-after');

  // Type eyebrow line 1
  addCursor(eyebrow);
  typeInto(eyebrow, line1, EYEBROW_SPEED, function () {

    // Pause, add <br>, type line 2
    setTimeout(function () {
      removeCursor(eyebrow);
      eyebrow.append('<br>');
      addCursor(eyebrow);
      typeInto(eyebrow, line2, EYEBROW_SPEED, function () {
        removeCursor(eyebrow);

        // Pause, then type heading
        setTimeout(function () {
          addCursor(heading);

          // Type text before link
          typeInto(heading, textBefore, HEADING_SPEED, function () {

            // Build the <a>, move cursor inside, type link text
            const $a = $('<a></a>').attr('href', linkHref);
            heading.find('.typing-cursor').before($a);
            heading.find('.typing-cursor').detach().appendTo($a);

            typeInto(heading, linkText, HEADING_SPEED, function () {

              // Move cursor back out after the link, type remaining text
              heading.find('.typing-cursor').detach().insertAfter($a);
              typeInto(heading, textAfter, HEADING_SPEED, function () {
                removeCursor(heading);
              });
            });
          });
        }, BLOCK_PAUSE);
      });
    }, LINE_PAUSE);
  });
});