import urlField from "../url-field"
import { mount } from "@vue/test-utils"

const factory = (props) =>
  mount(urlField, {
    propsData: props,
  })

/*
 * NOTE : jsdom as of yet doesn't support contenteditable features
 * hence, the test suite is pretty limited as it is not easy to test
 * inputting values.
 */

describe("url-field", () => {
  test("mounts properly", () => {
    const wrapper = factory({
      value: "test",
    })

    expect(wrapper.vm).toBeTruthy()
  })
  test("highlights environment variables", () => {
    const wrapper = factory({
      value: "https://hoppscotch.io/<<testa>>/<<testb>>",
    })

    const highlights = wrapper.findAll(".highlight-VAR").wrappers

    expect(highlights).toHaveLength(2)

    expect(highlights[0].text()).toEqual("<<testa>>")
    expect(highlights[1].text()).toEqual("<<testb>>")
  })
})
