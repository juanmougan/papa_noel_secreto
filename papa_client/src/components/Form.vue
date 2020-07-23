<template>
  <div class="form-container">
    <form>
      <div class="form-row">
        <!-- TODO maybe this should be a Component, and receive its index via props -->
        <input
          type="text"
          name="gifter"
          id="gifter-input-id"
          class="gifter-input"
          v-model="gifterEmail[0]"
          placeholder="Add people to the roster"
        />
        <button class="gifter-add-btn" id="gifter-add-btn-id" v-on:click="gifterEmail.push(gifterEmail[0])">+</button>
      </div>
      <div class="form-row">
        <ul id="roster-ul">
          <li v-if="gifterEmail[0]">
            {{ gifterEmail[0] }}
          </li>
        </ul>
      </div>
      <div class="form-row">
        <input type="submit" class="submit-btn" id="submit-btn-id" value="Generate!" />
        <input type="reset" id="clear-roster" class="submit-btn" value="Clear" />
      </div>
    </form>
  </div>
</template>>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

const gifterEmail = [];

@Component
export default class Form extends Vue {
  private gifterEmail: (string)[] = [];
}
</script>
