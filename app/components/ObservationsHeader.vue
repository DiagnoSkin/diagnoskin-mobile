<template>
    <FlexboxLayout justifyContent="space-between" alignItems="center">
        <Label class="margin titleLable" >Observations</Label>
        <Button class="margin addButton" @tap="navigateToCameraView"/>
    </FlexboxLayout>
</template>

<script>
  import { NavigationEntry } from 'tns-core-modules/ui/frame/frame';
  import Camera from '@/views/Camera.vue';

  export default {
      name: 'ObservationsHeader',
      data() {
        return {
        }
      },
      computed: {
        uid() {
          return this.$store.getters.getUser.uid
        }
      },
      methods: {
          navigateToCameraView() {
              this.$navigateTo(Camera)
          }
      }
  }
</script>

<style lang="scss" scoped>
.margin{
  // margin: 10;
  margin: 0 10;
}
.addButton{
  background-image: url('~/assets/navigation/addButton.png');
  background-repeat: no-repeat;
  background-position: center center;
  background-size: contain;
  height: 40;
  width: 40;
  
}
.titleLable{
  font-size: 30;
  font-weight: 700;
}
</style>