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
              <Label text="Observations"></Label>
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

export default Vue.extend({
  data() {
    return {
    }
  }
});
</script>

<style lang="scss" scoped>
</style>
