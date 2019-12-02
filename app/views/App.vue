<template>
    <Page>
        <BottomNavigation>
          <TabStrip>
            <TabStripItem>
              <Label text="Observations"></Label>
            </TabStripItem>
            <TabStripItem>
              <Label text="Profile"></Label>
            </TabStripItem>
            <TabStripItem>
              <Label text="Photos"></Label>
            </TabStripItem>
          </TabStrip>
          <TabContentItem>
            <StackLayout>
              <ObservationsHeader/>
              <ObservationList/>
            </StackLayout>
          </TabContentItem>
          <TabContentItem>
            <StackLayout>
              <Label text="Profile"></Label>
            </StackLayout>
          </TabContentItem>
          <TabContentItem>
            <StackLayout>
              <Label text="Photos"></Label>
            </StackLayout>
          </TabContentItem>
        </BottomNavigation>
    </Page>
</template>

<script lang="ts">
import Vue from 'vue';
import ObservationsHeader from '~/components/ObservationsHeader.vue';
import ObservationList from '~/components/ObservationList.vue';

export default Vue.extend({
  components: {
    ObservationsHeader,
    ObservationList
  },
  data() {
    return {
    }
  }
});
</script>

<style lang="scss" scoped>
</style>
