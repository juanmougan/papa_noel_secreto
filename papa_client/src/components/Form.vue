<template>
  <div class="form-container">
    <form @submit.prevent="onSubmit">
      <div class="form-row">
        <!-- TODO maybe this should be a Component, and receive its index via props -->
        <input
          type="text"
          name="gifter"
          id="gifter-input-id"
          class="gifter-input"
          v-model="someNewGifter"
          placeholder="Add people to the roster"
        />
        <button
          class="gifter-add-remove-btn"
          id="gifter-add-btn-id"
          v-on:click.prevent="addEmail(someNewGifter)"
        >+</button>
      </div>
      <div class="form-row">
        <ul id="roster-ul">
          <li v-for="gifterEmail in gifterEmails" :key="gifterEmail">
            <span>{{ gifterEmail }}</span>
            <button
              class="gifter-add-remove-btn"
              id="gifter-remove-btn-id"
              v-on:click.prevent="removeElement(gifterEmail)"
            >-</button>
          </li>
        </ul>
      </div>
      <div class="form-row">
        <input type="submit" class="submit-btn" id="submit-btn-id" value="Generate!" />
        <input
          type="reset"
          id="clear-roster"
          class="submit-btn"
          value="Clear"
          v-on:click.prevent="removeAllElements()"
        />
      </div>
    </form>
    <!-- Notifications section -->
    <div v-if="postWasSuccessful" class="notification is-success is-light">
      <button v-on:click="this.resetNotifications" class="delete"></button>
      Great! We've sent an email to each participant in the roster.
    </div>
    <div v-if="postFailed" class="notification is-danger is-light">
      <button v-on:click="this.resetNotifications" class="delete"></button>
      Unfortunately, something went wrong.
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import RosterService from "../services/roster-service";

@Component
export default class Form extends Vue {
  private gifterEmails: string[] = [];
  private someNewGifter = "";
  private postWasSuccessful = false;
  private postFailed = false;

  addEmail(email: string) {
    this.addElement(email);
    this.someNewGifter = "";
  }

  // TODO maybe a Set would be better
  addElement(gifter: string) {
    this.gifterEmails.push(gifter);
  }

  removeElement(gifter: string) {
    const index = this.gifterEmails.indexOf(gifter);
    if (index > -1) {
      this.gifterEmails.splice(index, 1);
    }
  }

  removeAllElements() {
    this.gifterEmails = [];
  }

  onSubmit() {
    // TODO check there are more than 3 people on the list
    RosterService.create(this.gifterEmails)
      .then((response) => {
        this.showPostSuccessful();
        this.removeAllElements();
      })
      .catch((e) => {
        this.postFailed = true;
      });
  }

  // TODO I don't like these flags. Figure out something better
  private showPostSuccessful(): void {
    this.postWasSuccessful = true;
    this.postFailed = false;
  }

  private showPostFailed(): void {
    this.postWasSuccessful = false;
    this.postFailed = true;
  }

  private resetNotifications(): void {
    this.postWasSuccessful = false;
    this.postFailed = false;
  }
}
</script>
