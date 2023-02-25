const COURIER = 'Courier New';

class MyTerminal {

    constructor() {
      this.content = 'hi bitch ';
      this.textSize = 40;
      this.x = 0;
      this.y = 0;
      this.gap = 40;
      this.margin = 30;
      this.setColor(0,255,0);

      this.withBackground = false;
      
      textFont(COURIER);
      textSize(this.textSize);
      textAlign(LEFT, CENTER);
    }

    print() {
      translate(this.margin, this.margin);
      if (this.withBackground) {
        fill(255, 0, 0);
        noStroke();
        let cWidth = textWidth(this.content);
        let cHeigth = textAscent();
        rect(this.x, this.y - cHeigth / 2, cWidth, cHeigth);
      }
      fill(this.textColor);
      text(this.content, this.x, this.y);
    }

    setColor(r, g, b) {
      this.textColor = color(r, g, b);
    }

    addText(newText) {
      this.content = this.content + '\n' + newText;
    }

}