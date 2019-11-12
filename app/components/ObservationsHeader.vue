<template>
    <FlexboxLayout justifyContent="space-between" alignItems="center">
        <Label class="margin titleLable" text="Observations"></Label>
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
      methods: {
          navigateToCameraView() {
              this.$navigateTo(Camera)
          }
      }
  }
</script>

<style lang="scss" scoped>
.margin{
  margin: 50px;
}
.addButton{
  background-image: url('~/assets/navigation/addButton.png');
  background-repeat: no-repeat;
  background-position: center center;
  background-size: contain;
  height: 150px;
  width: 150px;
}
.titleLable{
  font-size: 30;
  font-weight: 700;
}
</style>