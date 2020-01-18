<template>
    <FlexboxLayout class="wrapper">
        <Label class="title" text="Observations"></Label>
        <Button class="addButton" @tap="navigateToCameraView"/>
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
.title {
  width: 75%;
}
.addButton{
  background-image: url('~/assets/navigation/addButton.png');
  background-repeat: no-repeat;
  background-position: center center;
  background-size: contain;
  width: 25%;
}
Label {
  margin: none;
}
Button {
  margin: none;
}
</style>