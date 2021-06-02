import { html } from 'lit-html';
import {unsafeHTML} from 'lit-html/directives/unsafe-html.js'

export const htmlTemplate = (iData, cData) =>
  html`<div class="amfm__overlay"></div>
    <div class="amfm__fomoSignup">
      <div class="amfm__fomoSignup_Close" @click="${iData.event.closeFomo}">
        <span>&times;</span>
      </div>
      <section
        class="amfm__fomoSignup_step step1 ${iData.state.signed
          ? 'amfm__hide'
          : ''}"
      >
        <div class="amfm__fomoSignup_title">Hi!</div>
        <div class="amfm__fomoSignup_desc">${unsafeHTML(cData.title)}</div>
        <aside class="amfm__fomoSignup_content">
          <div class="amfm__fomoSignup_points">
            <strong>100</strong> Welcome Points
          </div>
          <div class="amfm__fomoSignup_coupon">
            <strong>20%</strong> off Coupon
          </div>
        </aside>
        <div>
          <div
            class="amfm__fomoSignup_button"
            @click="${iData.event.handleSignUp}"
          >
            ${cData.btn_text}
          </div>
        </div>
      </section>
      <section
        class="amfm__fomoSignup_step step2 ${iData.state.signed
          ? ''
          : 'amfm__hide'}"
      >
        <section class="amfm__fomoSignup_particles">
          <span><i></i></span> <span><i></i></span> <span><i></i></span>
          <span><i></i></span><span><i></i></span>
        </section>
        <div class="amfm__fomoSignup_title">${unsafeHTML(cData.congrats)}</div>
        <div class="amfm__fomoSignup_desc">${unsafeHTML(cData.coupon_title)}</div>
        <div>
          <div class="amfm__fomoSignup_button viewDashboard">
            View Dashboard
          </div>
          <div class="amfm__fomoSignup_button">Continue Shopping</div>
        </div>
      </section>
    </div>
    <style>
      :host {
        --bg-color: ${cData.bg_color};
        --btn-color: ${cData.btn_color};
      }
      * {
        margin: 0;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
      }
      .amfm__hide {
        display: none !important;
      }
      .amfm__overlay {
        display: none;
        position: fixed;
        top: 0;
        left: 0;
        z-index: 100;
        width: 100%;
        height: 100vh;
        background-color: rgba(0, 0, 0, 0.9);
        -webkit-transition: 0.2s ease;
        transition: 0.2s ease;
      }
      :host([display='modal']) .amfm__overlay {
        display: block;
        opacity: 0;
        pointer-events: none;
      }
      :host([display='modal'][opened]) .amfm__overlay {
        opacity: 1;
        pointer-events: all;
      }
      .amfm__fomoSignup {
        position: relative;
        font-family: Arial, sans-serif;
        display: -webkit-inline-box;
        display: -ms-inline-flexbox;
        display: inline-flex;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        height: 200px;
        padding: 10px 50px 10px 30px;
        color: #fff;
        font-size: 10px;
        line-height: 1.4;
        background-color: var(--bg-color);
        border-radius: 0 100px 100px 0;
        -webkit-transition: 0.2s ease;
        transition: 0.2s ease;
      }
      :host([display='modal']) .amfm__fomoSignup {
        position: fixed;
        bottom: 70px;
        left: 0;
        z-index: 101;
        opacity: 0;
        pointer-events: none;
      }
      :host([display='modal'][opened]) .amfm__fomoSignup {
        opacity: 1;
        pointer-events: all;
        -webkit-animation: slideLeft 0.5s ease-in-out 0.25s both;
        animation: slideLeft 0.5s ease-in-out 0.25s both;
      }
      .amfm__fomoSignup_Close {
        position: absolute;
        top: 0;
        right: 40px;
        z-index: 1;
        width: 1em;
        height: 1em;
        display: none;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        -webkit-box-pack: center;
        -ms-flex-pack: center;
        justify-content: center;
        color: #333;
        font-size: 2.6em;
        cursor: pointer;
      }
      .amfm__fomoSignup_Close:before {
        content: '';
        position: absolute;
        top: 50%;
        right: 50%;
        -webkit-transform: translate(50%, -50%) scale(1);
        transform: translate(50%, -50%) scale(1);
        width: 1em;
        height: 1em;
        border-radius: 50%;
        background-color: #fff;
        -webkit-box-shadow: 1px 2px 3px rgba(0, 0, 0, 0.2);
        box-shadow: 1px 2px 3px rgba(0, 0, 0, 0.2);
        -webkit-transition: 0.2s ease;
        transition: 0.2s ease;
      }
      .amfm__fomoSignup_Close span {
        position: relative;
        -webkit-transition: 0.2s ease;
        transition: 0.2s ease;
      }
      .amfm__fomoSignup_Close:hover:before {
        -webkit-transform: translate(50%, -50%) scale(1.25);
        transform: translate(50%, -50%) scale(1.25);
      }
      .amfm__fomoSignup_Close:hover span {
        -webkit-transform: rotate(90deg);
        transform: rotate(90deg);
      }
      :host([display='modal']) .amfm__fomoSignup_Close {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
      }
      :host([display='modal'][opened]) .amfm__fomoSignup_Close {
        -webkit-animation: justFade 0.5s linear 1s both;
        animation: justFade 0.5s linear 1s both;
      }
      @-webkit-keyframes justFade {
        0% {
          opacity: 0;
        }
        100% {
          opacity: 1;
        }
      }
      @keyframes justFade {
        0% {
          opacity: 0;
        }
        100% {
          opacity: 1;
        }
      }
      .amfm__fomoSignup_step {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-orient: vertical;
        -webkit-box-direction: normal;
        -ms-flex-direction: column;
        flex-direction: column;
        line-height: 1.2;
        width: 330px;
      }
      .step1 {
        width: 300px;
      }
      .step2 {
        width: 260px;
      }
      :host([offer='coupon']) .step1,
      :host([offer='points']) .step1 {
        width: 400px;
        padding-right: 140px;
      }
      :host([display='modal'][opened]) .amfm__fomoSignup_step > * {
        -webkit-animation: slideUp 0.3s ease-out both;
        animation: slideUp 0.3s ease-out both;
      }
      :host([display='modal'][opened]) .amfm__fomoSignup_step > :nth-child(1) {
        -webkit-animation-delay: 0.75s;
        animation-delay: 0.75s;
      }
      :host([display='modal'][opened]) .amfm__fomoSignup_step > :nth-child(2) {
        -webkit-animation-delay: 0.82s;
        animation-delay: 0.82s;
      }
      :host([display='modal'][opened]) .amfm__fomoSignup_step > :nth-child(3) {
        -webkit-animation-delay: 0.9s;
        animation-delay: 0.9s;
      }
      :host([display='modal'][opened]) .amfm__fomoSignup_step > :nth-child(4) {
        -webkit-animation-delay: 0.97s;
        animation-delay: 0.97s;
      }
      :host([display='modal'][opened]) .amfm__fomoSignup_step > :nth-child(5) {
        -webkit-animation-delay: 1.05s;
        animation-delay: 1.05s;
      }
      .amfm__fomoSignup_title {
        font-size: 1.6em;
        font-weight: 700;
        margin-bottom: 10px;
      }
      .amfm__fomoSignup_desc {
        font-size: 1.6em;
        margin-bottom: 14px;
      }
      .amfm__fomoSignup_content {
        position: absolute;
        top: 30px;
        right: 30px;
        font-size: 1.4em;
        line-height: 1.2;
        font-weight: 700;
        display: none;
      }
      .amfm__fomoSignup_content strong {
        font-size: 180%;
      }
      :host([offer='coupon']) .amfm__fomoSignup_content,
      :host([offer='points']) .amfm__fomoSignup_content {
        width: 135px;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        -webkit-box-pack: center;
        -ms-flex-pack: center;
        justify-content: center;
      }
      .amfm__fomoSignup_coupon,
      .amfm__fomoSignup_points {
        -webkit-box-flex: 0;
        -ms-flex: 0 0 135px;
        flex: 0 0 135px;
        max-width: 135px;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-orient: vertical;
        -webkit-box-direction: normal;
        -ms-flex-direction: column;
        flex-direction: column;
        -webkit-box-pack: center;
        -ms-flex-pack: center;
        justify-content: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        text-align: center;
        height: 135px;
        padding: 0 14px;
        color: var(--bg-color);
        background-color: #fff;
        border-radius: 50%;
        -webkit-box-shadow: 0 0 0 8px inset #fff, 0 0 0 10px inset currentColor,
          0 5px 5px rgba(0, 0, 0, 0.15);
        box-shadow: 0 0 0 8px inset #fff, 0 0 0 10px inset currentColor,
          0 5px 5px rgba(0, 0, 0, 0.15);
        -webkit-animation: heartBeat 2.6s ease-in-out 2.5s both infinite;
        animation: heartBeat 2.6s ease-in-out 2.5s both infinite;
      }
      @-webkit-keyframes heartBeat {
        0% {
          -webkit-transform: scale(1);
          transform: scale(1);
        }
        7% {
          -webkit-transform: scale(1.3);
          transform: scale(1.3);
        }
        14% {
          -webkit-transform: scale(1);
          transform: scale(1);
        }
        28% {
          -webkit-transform: scale(1.3);
          transform: scale(1.3);
        }
        42% {
          -webkit-transform: scale(1);
          transform: scale(1);
        }
      }
      @keyframes heartBeat {
        0% {
          -webkit-transform: scale(1);
          transform: scale(1);
        }
        7% {
          -webkit-transform: scale(1.3);
          transform: scale(1.3);
        }
        14% {
          -webkit-transform: scale(1);
          transform: scale(1);
        }
        28% {
          -webkit-transform: scale(1.3);
          transform: scale(1.3);
        }
        42% {
          -webkit-transform: scale(1);
          transform: scale(1);
        }
      }
      :host([offer='points']) .amfm__fomoSignup_coupon {
        display: none;
      }
      :host([offer='coupon']) .amfm__fomoSignup_points {
        display: none;
      }
      .amfm__fomoSignup_button {
        display: inline-block;
        min-width: 150px;
        font-size: 1.6em;
        color: #fff;
        line-height: 2.8em;
        text-align: center;
        padding: 0 15px;
        cursor: pointer;
        border-radius: 1.5em;
        background-color: var(--btn-color);
        -webkit-transition: 0.18s;
        transition: 0.18s;
        will-change: transform;
      }
      .amfm__fomoSignup_button:hover {
        -webkit-box-shadow: 0 0 0 2px #fff inset;
        box-shadow: 0 0 0 2px #fff inset;
      }
      .amfm__fomoSignup_button:active {
        -webkit-transform: translateY(-2px) scale(0.96);
        transform: translateY(-2px) scale(0.96);
      }
      :host([gr='true']) .step2 .amfm__fomoSignup_button:last-child {
        cursor: pointer;
        color: #fff;
        text-decoration: underline;
        font-size: 1.6em;
        background: 0 0;
        opacity: 0.9;
      }
      :host([gr='true']) .step2 .amfm__fomoSignup_button:last-child:hover {
        opacity: 1;
        -webkit-box-shadow: none;
        box-shadow: none;
        -webkit-transform: none;
        transform: none;
      }
      .amfm__fomoSignup_button.viewDashboard {
        display: none;
      }
      :host([gr='true']) .amfm__fomoSignup_button.viewDashboard {
        display: inline-block;
      }
      .amfm__fomoSignup_particles {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 1;
        pointer-events: none;
      }
      .amfm__fomoSignup_particles span {
        position: absolute;
        top: 10%;
        left: 10%;
      }
      .amfm__fomoSignup_particles span i {
        display: block;
        -webkit-animation: fadeParticle 1s linear both;
        animation: fadeParticle 1s linear both;
      }
      .amfm__fomoSignup_particles span i:before {
        content: '';
        display: block;
        width: 24px;
        height: 24px;
        background: url(../images/particle2.png) 0 0 no-repeat;
        -webkit-animation: particle1 0.5s steps(4) 2 both;
        animation: particle1 0.5s steps(4) 2 both;
      }
      .amfm__fomoSignup_particles span:nth-child(1) i,
      .amfm__fomoSignup_particles span:nth-child(1) i:before {
        -webkit-animation-delay: 0.5s;
        animation-delay: 0.5s;
      }
      .amfm__fomoSignup_particles span:nth-child(2) {
        top: 20%;
        left: 50%;
        -webkit-transform: scale(0.8);
        transform: scale(0.8);
      }
      .amfm__fomoSignup_particles span:nth-child(2) i:before {
        background-image: url(../images/particle3.png);
      }
      .amfm__fomoSignup_particles span:nth-child(2) i,
      .amfm__fomoSignup_particles span:nth-child(2) i:before {
        -webkit-animation-delay: 0.6s;
        animation-delay: 0.6s;
      }
      .amfm__fomoSignup_particles span:nth-child(3) {
        top: 50%;
        left: 20%;
        -webkit-transform: scale(0.7);
        transform: scale(0.7);
      }
      .amfm__fomoSignup_particles span:nth-child(3) i,
      .amfm__fomoSignup_particles span:nth-child(3) i:before {
        -webkit-animation-delay: 0.7s;
        animation-delay: 0.7s;
      }
      .amfm__fomoSignup_particles span:nth-child(4) {
        top: 70%;
        left: 60%;
        -webkit-transform: scale(1.1);
        transform: scale(1.1);
      }
      .amfm__fomoSignup_particles span:nth-child(4) i:before {
        background-image: url(../images/particle3.png);
      }
      .amfm__fomoSignup_particles span:nth-child(4) i,
      .amfm__fomoSignup_particles span:nth-child(4) i:before {
        -webkit-animation-delay: 0.65s;
        animation-delay: 0.65s;
      }
      .amfm__fomoSignup_particles span:nth-child(5) {
        top: 30%;
        left: 40%;
        -webkit-transform: scale(0.75);
        transform: scale(0.75);
      }
      .amfm__fomoSignup_particles span:nth-child(5) i,
      .amfm__fomoSignup_particles span:nth-child(5) i:before {
        -webkit-animation-delay: 0.88s;
        animation-delay: 0.88s;
      }
      @keyframes fadeParticle {
        0% {
          opacity: 0;
          -webkit-transform: scale(0.5);
          transform: scale(0.5);
        }
        15% {
          opacity: 1;
          -webkit-transform: scale(1.5);
          transform: scale(1.5);
        }
        85% {
          opacity: 1;
        }
        100% {
          opacity: 0;
          -webkit-transform: scale(1);
          transform: scale(1);
        }
      }
      @keyframes particle1 {
        0% {
          background-position: 0 0;
        }
        100%,
        60% {
          background-position: -96px 0;
        }
      }
      @keyframes slideUp {
        0% {
          -webkit-transform: translateY(50px);
          transform: translateY(50px);
          opacity: 0;
        }
        100% {
          -webkit-transform: translateY(0);
          transform: translateY(0);
          opacity: 1;
        }
      }
      @keyframes slideLeft {
        0% {
          opacity: 0;
          -webkit-transform: translateX(-100px);
          transform: translateX(-100px);
        }
        100% {
          opacity: 1;
          -webkit-transform: translateX(0);
          transform: translateX(0);
        }
      }
    </style> `;
