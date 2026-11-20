<?php

namespace Tests\Feature;

use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class ComoAsociarsePageTest extends TestCase
{
    public function test_muestra_los_requisitos_para_mayores_y_menores(): void
    {
        $this->get('/como-asociarse')
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->component('Public/ComoAsociarse')
                ->has('requisitos.mayores')
                ->has('requisitos.menores')
                ->has('requisitos.condicionesMenores')
            );
    }
}
