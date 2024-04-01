const content = document.querySelector("[text-typing]");
const text = `html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed,
figure, figcaption, footer, header, hgroup,
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
}

/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure,
footer, header, hgroup, menu, nav, section {
  display: block;
}

body {
  line-height: 1;
}

ol, ul {
  list-style: none;
}

blockquote, q {
  quotes: none;
}

blockquote:before, blockquote:after,
q:before, q:after {
  content: "";
  content: none;
}

table {
  border-collapse: collapse;
  border-spacing: 0;
}`;
function typingRunner(element, content, color = '#1fe81f', timeRun = 100) {
    const text = content.split("");
    let index = 0;
    const span = document.createElement('span');
    span.style
    element.style.color = color;
    element.append(span);
    Object.assign(span.style, {
        height: "16px",
        width: "2px",
        background: color,
        display: "inline-block",
        marginLeft: '3px'
    })
    span.animate([{
        opacity: 0
    }, {
        opacity: 1
    }], {
        duration: timeRun * 2.5,
        iterations: Infinity,
        direction: 'alternate'
    })

    const typing = setInterval(() => {
        const textNode = document.createTextNode(text[index])
        element.insertBefore(textNode, span);
        if (index === text.length - 1) {
            clearInterval(typing);
            span.remove();
        }
        index++;
    }, timeRun);
}

typingRunner(content, text, undefined, 50)