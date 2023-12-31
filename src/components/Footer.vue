<template>
  <div class="footer">
    <div class="footer1">
      <div class="footer11">
        <div class="F1">Company</div>
        <div class="f2">About Us</div>
        <div class="f2">Our Store</div>
        <div class="f2">Contact Us</div>
      </div>
      <div class="footer11">
        <div class="F1">Career Opportunities</div>
        <div class="f2">Selling Programs</div>
        <div class="f2">Advertise</div>
        <div class="f2">Cooperation</div>
      </div>
      <div class="footer11">
        <div class="F1">How to Buy</div>
        <div class="f2">Making Payment</div>
        <div class="f2">Delivery Option</div>
        <div class="f2">Buyer Protection</div>
        <div class="f2">New User Guide</div>
      </div>
      <div class="footer11">
        <div class="F1">Help</div>
        <div class="f2">Contacts Us</div>
        <div class="f2">FAQ</div>
        <div class="f2">Privacy Policy</div>
      </div>
    </div>
  </div>
  <div class="footer2">
    <div class="footer21">
      <div class="pay-m">
        <div><img src="../assets/image-112.png" alt="" /></div>
        <div><img src="../assets/image-113.png" alt="" /></div>
        <div><img src="../assets/image-114.png" alt="" /></div>
      </div>
      <div>
        <select>
          <option>English</option>
        </select>
      </div>
    </div>
    <div class="footer22">
      <div class="ft1">165-179 Forster Road City of Monash, Melbourne, Australia</div>
      <div class="ft2">©2023 Copyright in reserved for lumine shop</div>
      <div class="ft3">
        <div><img src="../assets/instagram1.svg" alt="" /></div>
        <div><img src="../assets/facebook.svg" alt="" /></div>
        <div><img src="../assets/telegram1.svg" alt="" /></div>
      </div>
    </div>
  </div>
</template>
<script>
export default {};
</script>
<style>
@media only screen and (max-width: 600px) {
  .footer21 div select {
    display: none;
  }
  .footer1 {
    display: grid !important;
    grid-template-columns: repeat(2, 1fr);
    flex: unset !important;
  }
  .footer {
    padding: var(--spacing-14, 60px) 16px var(--spacing-14, 60px) 16px !important;
  }
  .footer22 {
    display: none !important;
  }
}
.footer22 {
  justify-content: space-between;
}
</style>
