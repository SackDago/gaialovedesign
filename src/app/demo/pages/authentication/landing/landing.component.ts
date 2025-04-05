import { RouterModule } from '@angular/router';
import { Component, OnInit, HostListener } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [RouterModule, CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss'
})

export default class LandingComponent implements OnInit {
  isScrolled = false;
  isMenuActive = false;
  currentYear = new Date().getFullYear();
  newsletterEmail = '';
  contactForm: FormGroup;

  // Datos para las secciones dinámicas
  services = [
    {
      icon: 'fas fa-home',
      title: 'Diseño Residencial',
      description: 'Transformamos casas en hogares que respiran tu esencia, creando espacios que te abrazan y te inspiran cada día.'
    },
    {
      icon: 'fas fa-store',
      title: 'Espacios Comerciales',
      description: 'Diseñamos entornos comerciales con alma que conectan con tus clientes a nivel emocional y energético.'
    },
    {
      icon: 'fas fa-seedling',
      title: 'Diseño Biofílico',
      description: 'Integramos la naturaleza en tus espacios para mejorar tu bienestar, creatividad y conexión con la tierra.'
    },
    {
      icon: 'fas fa-yin-yang',
      title: 'Consultoría Energética',
      description: 'Analizamos la energía de tus espacios para armonizarlos y convertirlos en lugares que potencian tu bienestar.'
    }
  ];

  projects = [
    {
      image: '/assets/images/project1.jpg',
      title: 'Casa Serenidad',
      description: 'Un hogar que abraza la luz natural y las texturas orgánicas para crear un refugio de paz.'
    },
    {
      image: '/assets/images/project2.jpg',
      title: 'Estudio Creativo',
      description: 'Un espacio de trabajo que inspira la creatividad a través de elementos naturales y luz abundante.'
    },
    {
      image: '/assets/images/project3.jpg',
      title: 'Café Tierra',
      description: 'Un local comercial que invita a la conexión y la pausa consciente en medio de la ciudad.'
    },
    {
      image: '/assets/images/project4.jpg',
      title: 'Refugio Montaña',
      description: 'Una casa de montaña que dialoga con el paisaje y honra los materiales autóctonos.'
    }
  ];

  testimonials = [
    {
      text: 'Trabajar con Gaia Designs fue una experiencia transformadora no solo para mi hogar sino para mi vida. Entendieron mi esencia y la plasmaron en cada rincón, creando un espacio que realmente se siente como una extensión de mi alma.',
      image: '../../../../../assets/images/user/avatar-1.jpg',
      name: 'Laura Mendoza',
      role: 'Casa Familiar'
    },
    {
      text: 'Mi espacio de yoga necesitaba transmitir paz y conexión. El equipo de Gaia no solo diseñó un lugar hermoso, sino que logró crear un santuario donde mis alumnos pueden conectar profundamente con su práctica y su ser interior.',
      image: '../../../../../assets/images/user/avatar-2.jpg',
      name: 'Carlos Vega',
      role: 'Centro de Yoga'
    },
    {
      text: 'Desde que renovamos nuestra tienda con Gaia Designs, nuestros clientes no solo compran más, sino que permanecen más tiempo en el local. Han creado un ambiente que invita a quedarse y conectar con nuestros productos de manera auténtica.',
      image: '../../../../../assets/images/user/avatar-3.jpg',
      name: 'María Jiménez',
      role: 'Tienda Orgánica'
    }
  ];

  blogPosts = [
    {
      image: '/assets/images/blog1.jpg',
      date: '12 Abril, 2025',
      title: 'El poder de los rituales en el hogar',
      excerpt: 'Descubre cómo crear pequeños rituales diarios que transforman la energía de tu espacio y tu vida.'
    },
    {
      image: '/assets/images/blog2.jpg',
      date: '5 Abril, 2025',
      title: 'Materiales conscientes para un hogar saludable',
      excerpt: 'Una guía sobre los materiales naturales que pueden transformar la salud de tu hogar y del planeta.'
    },
    {
      image: '/assets/images/blog3.jpg',
      date: '28 Marzo, 2025',
      title: 'El diseño como meditación activa',
      excerpt: 'Cómo el proceso de diseñar y habitar conscientemente se convierte en una práctica espiritual.'
    }
  ];

  contactInfo = {
    address: 'Calle del Sol 555, Ciudad Jardín',
    email: 'hola@gaiadesigns.com',
    phone: '+34 661 979 448',
    hours: 'Lun-Vie: 9:00 - 18:00'
  };

  socialMedia = [
    { icon: 'fab fa-instagram' },
    { icon: 'fab fa-pinterest' },
    { icon: 'fab fa-facebook' },
    { icon: 'fab fa-whatsapp' }
  ];

  footerLinks = {
    main: [
      { name: 'Inicio', url: '#inicio', id: 'inicio' },
      { name: 'Sobre Nosotros', url: '#sobre-nosotros', id: 'sobre-nosotros' },
      { name: 'Servicios', url: '#servicios', id: 'servicios' },
      { name: 'Proyectos', url: '#proyectos', id: 'proyectos' },
      { name: 'Blog', url: '#blog', id: 'blog' }
    ],
    services: [
      { name: 'Diseño Residencial', url: '#servicios' },
      { name: 'Espacios Comerciales', url: '#servicios' },
      { name: 'Diseño Biofílico', url: '#servicios' },
      { name: 'Consultoría Energética', url: '#servicios' }
    ]
  };

  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      subject: ['', Validators.required],
      message: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    // Cualquier inicialización adicional aquí
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = window.scrollY > 50;
  }

  toggleMenu() {
    this.isMenuActive = !this.isMenuActive;
  }

  scrollToSection(sectionId: string) {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
      this.isMenuActive = false; // Cerrar menú móvil después de hacer clic
    }
    return false; // Prevenir el comportamiento por defecto del enlace
  }

  onSubmit() {
    if (this.contactForm.valid) {
      console.log('Formulario enviado:', this.contactForm.value);
      // Aquí iría la lógica para enviar el formulario a un backend
      // Por ejemplo, usando un servicio de Angular para hacer una petición HTTP
      
      // Resetear el formulario después de enviar
      this.contactForm.reset();
      
      // Mostrar mensaje de éxito (esto podría ser reemplazado por un componente de alerta o toast)
      alert('Mensaje enviado con éxito. Nos pondremos en contacto contigo pronto.');
    } else {
      // Marcar todos los campos como tocados para mostrar los errores
      Object.keys(this.contactForm.controls).forEach(key => {
        const control = this.contactForm.get(key);
        control?.markAsTouched();
      });
    }
  }

  subscribeNewsletter() {
    if (this.newsletterEmail && this.validateEmail(this.newsletterEmail)) {
      console.log('Suscripción al newsletter:', this.newsletterEmail);
      // Aquí iría la lógica para enviar la suscripción a un backend
      
      // Resetear el campo después de enviar
      this.newsletterEmail = '';
      
      // Mostrar mensaje de éxito
      alert('¡Gracias por suscribirte a nuestro newsletter!');
    } else {
      alert('Por favor, introduce un email válido.');
    }
  }

  // Método auxiliar para validar email
  private validateEmail(email: string): boolean {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(email);
  }
}