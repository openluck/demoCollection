<template>
  <button class="g-button"></button>
</template>
<script>
export default {};
</script>
<style scoped lang="sass">
.g-button {
  font-size: var(--font-size)
  height: var(--button-height)
  padding: 0 1em
  border-radius: var(--border-radius)
  border: 1px solid var(--border-color)
  background: var(--button-bg)
  &:hover
    border-color: var(--border-color-hover)
  &:active
    border-color: var(--border-color-hover)
  &:focus
    outline: none
}
  
</style>