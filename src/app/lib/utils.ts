import { FormData } from '@/app/components/contact/Form';
export const navigationLinks: { name: string; href: string }[] = [
    { name: 'Acasă', href: '/' },
    { name: 'Articole', href: '/articles' },
    { name: 'Tipare', href: '/templates' },
    { name: 'Contact', href: '/contact' },

];

export function generateSlug(title : string) {
    return title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
  }
 

export function sendEmail(data: FormData) {
    const apiEndpoint = '/api/contact';
  
    fetch(apiEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((response) => {
        alert(response.message);
      })
      .catch((err) => {
        alert(err.message);
      });
}