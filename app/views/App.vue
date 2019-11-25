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
              <Label v-bind:text="loginCount"></Label>
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

export default Vue.extend({
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
