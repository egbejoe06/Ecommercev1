<template>
  <div class="popup-success">
    <div><img src="../assets/confetti.png" alt="" /></div>
    <div class="popup3">
      <div class="popup1">Payment Successful</div>
      <div class="popup2">Thank you for your payment.</div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style>
@media only screen and (max-width: 600px) {
  .popup-success {
    width: 100%;
    top: 12%;
    left: 26%;
  }
}
.popup-success {
  box-shadow: 0 16px 17px 15px rgba(0, 0, 0, 0.1);
  display: flex;
  padding: var(--spacing-11, 15px);
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-6, 24px);
  border-radius: var(--spacing-2, 8px);
  background: var(--background-color-white, #fff);
  width: 369px;
  position: absolute;
  top: 30%;
  left: 35%;
}
.popup-success div img {
  width: 90px;
  height: 90px;
}
.popup1 {
  color: var(--text-color-light-primary-text, #262626);
  text-align: center;
  font-family: Lato;
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: 25px; /* 125% */
}
.popup2 {
  color: var(--text-color-light-primary-text, #262626);
  text-align: center;
  font-family: Lato;
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: 25px; /* 125% */
}
.popup3 {
  display: flex;
  padding: var(--spacing-0, 0px);
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-2, 8px);
}
</style>
