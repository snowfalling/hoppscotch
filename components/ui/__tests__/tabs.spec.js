import tabs from "../tabs"
import tab from "../tab"

import { mount } from "@vue/test-utils"

const factory = () =>
  mount(tabs, {
    slots: {
      default: [
        `<tab id="tab1" href="#" :label="'tab 1'" :icon="'testicon1'" :selected=true><div id="tab1render">tab1</div></tab>`,
        `<tab id="tab2" href="#" :label="'tab 2'" :icon="'testicon2'"><div id="tab2render">tab1</div></tab>`,
        `<tab id="tab3" href="#" :label="'tab 3'" :icon="'testicon3'"><div id="tab3render">tab1</div></tab>`,
      ],
    },
    stubs: {
      tab,
    },
  })

describe("tabs", () => {
  test("mounts properly", async () => {
    const wrapper = factory()

    await wrapper.vm.$nextTick()

    expect(wrapper).toBeTruthy()
  })

  test("tab labels shown", async () => {
    const wrapper = factory()

    await wrapper.vm.$nextTick()

    const labels = wrapper.findAll("li a span").wrappers.map((w) => w.text())
    expect(labels).toEqual(["tab 1", "tab 2", "tab 3"])
  })

  test("tab icons are shown", async () => {
    const wrapper = factory()

    await wrapper.vm.$nextTick()

    const labels = wrapper.findAll("li a i").wrappers.map((w) => w.text())
    expect(labels).toEqual(["testicon1", "testicon2", "testicon3"])
  })

  test("clicking on tab labels switches the selected page", async () => {
    const wrapper = factory()

    await wrapper.vm.$nextTick()
    wrapper.vm.selectTab({ id: "tab2" })
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.$data.tabs[1].$data.isActive).toEqual(true)
  })

  test("switched tab page is rendered and the other page is not rendered", async () => {
    const wrapper = factory()

    await wrapper.vm.$nextTick()
    wrapper.vm.selectTab({ id: "tab2" })
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.$data.tabs[0].$data.isActive).toEqual(false)
    expect(wrapper.vm.$data.tabs[1].$data.isActive).toEqual(true)
    expect(wrapper.vm.$data.tabs[2].$data.isActive).toEqual(false)
  })
})
