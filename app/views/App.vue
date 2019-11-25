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
            </StackLayout>
          </TabContentItem>
          <TabContentItem>
            <StackLayout>
              <Profile></Profile>
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
import Profile from '@/components/Profile.vue'
import { mapState } from 'vuex';
import ObservationsHeader from '~/components/ObservationsHeader.vue';

export default Vue.extend({
  components: {
    ObservationsHeader
  },
  data() {
    return {
      
    }
  },
  computed: {
    ...mapState(['loginCount'])
  },
  components: {
    "Profile": Profile
  }
});
</script>

<style lang="scss" scoped>
</style>
