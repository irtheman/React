class PopUpInfo extends HTMLElement {
    constructor() {
      super();

      const shadow = this.attachShadow({mode: 'open'});

      const wrapper = document.createElement('span');
      wrapper.setAttribute('class', 'wrapper');
  
      this.icon = document.createElement('span');
      this.icon.setAttribute('class', 'icon');
      this.icon.setAttribute('tabindex', 0);
  
      this.info = document.createElement('span');
      this.info.setAttribute('class', 'popupinfo');

      var sheet = new CSSStyleSheet();
      sheet.replaceSync(`
        .wrapper {
          position: relative;
        }
          
        .popupinfo {
          font-size: 0.8rem;
          width: 200px;
          display: inline-block;
          border: 1px solid black;
          padding: 10px;
          background: white;
          border-radius: 10px;
          opacity: 0;
          transition: 0.6s all;
          position: static;
          bottom: 20px;
          left: 10px;
          z-index: 3;
        }
        
        img {
          width: 1.2rem;
        }
        
        .icon:hover + .popupinfo, .icon:focus + .popupinfo {
          opacity: 1;
        }`
      );
      shadow.adoptedStyleSheets = [ sheet ];

      shadow.appendChild(wrapper);
      wrapper.appendChild(this.icon);
      wrapper.appendChild(this.info);
    }

    connectedCallback() {
      this.info.textContent = this.innerHTML;

      let imgUrl;
      if(this.hasAttribute('img')) {
        imgUrl = this.getAttribute('img');
      }
      else {
        imgUrl = 'images/default.png';
      }

      const img = document.createElement('img');
      img.src = imgUrl;
      this.icon.appendChild(img);
    }
}
  
  customElements.define('popup-info', PopUpInfo);