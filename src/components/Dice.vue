<template>
  <div class="container" >
    <div class="cube" ref="cube" @click="rollDice">
      <div class="front">
        <span class="fas fa-circle"></span>
      </div>
      <div class="back">
        <pre class="firstPre"><span class="fas fa-circle"></span>    <span class="fas fa-circle"></span>    <span class="fas fa-circle"></span></pre><br>
        <pre class="secondPre"><span class="fas fa-circle"></span>    <span class="fas fa-circle"></span>    <span class="fas fa-circle"></span></pre>
      </div>
      <div class="top">
        <span class="fas fa-circle"></span>
        <span class="fas fa-circle"></span>
      </div>
      <div class="left">
        <span class="fas fa-circle"></span>
        <span class="fas fa-circle"></span>
        <span class="fas fa-circle"></span>
      </div>
      <div class="right">
        <span class="fas fa-circle"></span>
        <span class="fas fa-circle"></span>
        <span class="fas fa-circle"></span>
        <span class="fas fa-circle"></span>
        <span class="fas fa-circle"></span>
      </div>
      <div class="bottom">
        <span class="fas fa-circle"></span>
        <span class="fas fa-circle"></span>
        <span class="fas fa-circle"></span>
        <span class="fas fa-circle"></span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DiceRoller',
  methods: {
    rollDice() {
      const cube = this.$refs.cube;
      const angleArray = [
        [0, 0, 0],
        [-310, -362, -38],
        [-400, -320, -2],
        [135, -217, -88],
        [-224, -317, 5],
        [-47, -219, -81],
        [-133, -360, -53]
      ];
      cube.style.animation = 'animate 1.4s linear';
      const randomAngle = Math.floor(Math.random() * 6) + 1;
      cube.style.transform = `rotateX(${angleArray[randomAngle][0]}deg) rotateY(${angleArray[randomAngle][1]}deg) rotateZ(${angleArray[randomAngle][2]}deg)`;
      cube.style.transition = '1s linear';

      cube.addEventListener('animationend', () => {
        cube.style.animation = '';
      });
    }
  }
}
</script>

<style scoped>
.container {
  perspective: 1000px;
  perspective-origin: 50% 50%;
  font-family: 'fontawesome';
}
.container .cube {
  position: relative;
  left: 50%;
  top: 50%;
  height: 100px;
  width: 100px;
  transform-style: preserve-3d;
  cursor: pointer;
  transform: rotateX(135deg) rotateY(-217deg) rotateZ(-88deg);
}

.container .cube div {
  position: absolute;
  box-sizing: border-box;
  padding: 5px;
  height: 100%;
  width: 100%;
  border: 1px solid #eee;
  color: #fff;
}

.container .cube div span {
  font-size: 16px;
}

.container .cube .front span,
.container .cube .left span:nth-child(1),
.container .cube .right span:nth-child(1) {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.container .cube .top span:nth-child(1),
.container .cube .left span:nth-child(2),
.container .cube .right span:nth-child(2),
.container .cube .bottom span:nth-child(1) {
  position: absolute;
  top: 15px;
  left: 15px;
}

.container .cube .top span:nth-child(2),
.container .cube .left span:nth-child(3),
.container .cube .right span:nth-child(3),
.container .cube .bottom span:nth-child(2) {
  position: absolute;
  bottom: 15px;
  right: 15px;
}

.container .cube .right span:nth-child(4),
.container .cube .bottom span:nth-child(3) {
  position: absolute;
  top: 15px;
  right: 15px;
}

.container .cube .right span:nth-child(5),
.container .cube .bottom span:nth-child(4) {
  position: absolute;
  bottom: 15px;
  left: 15px;
}

.container .cube .back pre {
  font-size: 16px;
  font-family: 'Font Awesome 5 Free';
  margin: 0;
}

.container .cube .back .firstPre {
  position: absolute;
  top: 15px;
  left: 15px;
}

.container .cube .back .secondPre {
  position: absolute;
  bottom: 15px;
  right: 15px;
}

.container .cube .front {
  background: #222;
  transform: translateZ(50px);
}

.container .cube .back {
  background: #222;
  transform: translateZ(-50px) rotateY(180deg);
}

.container .cube .right {
  background: #222;
  transform-origin: top right;
  transform: rotateY(-270deg) translateX(50px);
}

.container .cube .left {
  background: #222;
  transform-origin: center left;
  transform: rotateY(270deg) translateX(-50px);
}

.container .cube .top {
  background: #222;
  transform-origin: top center;
  transform: rotateX(-270deg) translateY(-50px);
}

.container .cube .bottom {
  background: #222;
  transform-origin: bottom center;
  transform: rotateX(270deg) translateY(50px);
}

.container .cube .back pre {
  font-size: 16px;
  font-family: 'fontawesome';

  margin: 0;
}

/*.container .cube .back .firstPre {
  position: absolute;
  top: 11px;
  left: 13px;
}

.container .cube .back .secondPre {
  position: absolute;
  bottom: 11px;
  right: 13px;
}*/

@keyframes animate {
  25% {
    transform: rotateX(45deg) rotateY(65deg) rotateZ(35deg);
    top: 0%;
  }
  50% {
    transform: rotateX(145deg) rotateY(165deg) rotateZ(135deg);
    top: 30%;
  }
  75% {
    transform: rotateX(276deg) rotateY(256deg) rotateZ(246deg);
    top: 45%;
  }
  100% {
    transform: rotateX(376deg) rotateY(356deg) rotateZ(346deg);
    top: 60%;
  }
}


</style>
