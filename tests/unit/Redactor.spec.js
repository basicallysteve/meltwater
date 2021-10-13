import { createLocalVue,shallowMount } from '@vue/test-utils'
import Redactor from '@/components/Redactor.vue'
import { BootstrapVue } from 'bootstrap-vue'

describe('Redactor.vue', () => {
  const localVue = createLocalVue()
  localVue.use(BootstrapVue)
  it('should redact phrases pizza place, beer and John\'s place', async () => {
    let phrases = [ 'Pizza place', 'beer', "John\'s place"]
    const wrapper = shallowMount(Redactor, {
      propsData: { phrases },
      localVue
    })

    wrapper.setData({
      text: "The closest pizza place to us is Little Vincent's. We'll go by there first, pick up the beer and then swing to John's place."
    });
    await wrapper.vm.$nextTick();
    let redactedText = wrapper.find('[name="redacted-text"]');
    expect(redactedText.text()).toMatch("The closest XXXX to us is Little Vincent's. We'll go by there first, pick up the XXXX and then swing to XXXX.")
  })

  it("should redact phrases tool and stool, but not toadstool", async ()=>{
    let phrases = ['tool', 'stool'];
    const wrapper = shallowMount(Redactor, {
      propsData: { phrases },
      localVue
    })

    wrapper.setData({
      text: "Mario went to the castle to save Princess Peach. When he arrived, he found Toadstool sitting on a stool and told him that he must go to another castle to save her. Before he left, Mario added a new tool to his arsenal."
    });
    await wrapper.vm.$nextTick();
    let redactedText = wrapper.find('[name="redacted-text"]');
    expect(redactedText.text()).toMatch("Mario went to the castle to save Princess Peach. When he arrived, he found Toadstool sitting on a XXXX and told him that he must go to another castle to save her. Before he left, Mario added a new XXXX to his arsenal.")
  })
})
