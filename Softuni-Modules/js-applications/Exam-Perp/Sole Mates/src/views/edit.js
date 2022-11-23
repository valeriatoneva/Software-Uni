import { html, render } from '../../node_modules/lit-html/lit-html.js';
import { editShoes, getShoesById} from '../api/data.js';
import { updateNav } from '../app.js';


const editTemplate = (onSubmit) => html`
<section id="edit">
<div class="form">
  <h2>Edit item</h2>
  <form @submit=${onSubmit} class="edit-form">
    <input
      type="text"
      name="brand"
      id="shoe-brand"
      placeholder="Brand"
    />
    <input
      type="text"
      name="model"
      id="shoe-model"
      placeholder="Model"
    />
    <input
      type="text"
      name="imageUrl"
      id="shoe-img"
      placeholder="Image url"
    />
    <input
      type="text"
      name="release"
      id="shoe-release"
      placeholder="Release date"
    />
    <input
      type="text"
      name="designer"
      id="shoe-designer"
      placeholder="Designer"
    />
    <input
      type="text"
      name="value"
      id="shoe-value"
      placeholder="Value"
    />

    <button type="submit">post</button>
  </form>
</div>
</section>
`;

export async function editPage(ctx) {
    const shoe = await getShoeById(ctx.params.id)
    ctx.render(editTemplate(shoe, onSubmit));
  
    async function onSubmit(e) {
      e.preventDefault();
  
      const formData = new FormData(e.target);
      
      const shoe = {
        brand: formData.get('brand').trim(),
        model: formData.get('model').trim(),
        imageUrl: formData.get('imageUrl').trim(),
        release: formData.get('release').trim(),
        designer: formData.get('designer').trim(),
        value: formData.get('value').trim()
      }
  
      if (shoe.brand == "" || shoe.model == "" || shoe.imageUrl == "" || shoe.release == "" || shoe.designer == "" || shoe.value == "") {
        return alert("All fields are required!");
      }
  
      await editShoes(ctx.params.id, shoe);
      e.target.reset();
      ctx.page.redirect(`/details/${ctx.params.id}`);
    }
  }
  