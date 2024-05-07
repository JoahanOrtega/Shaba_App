<?php

namespace Database\Factories;
use App\Models\Product;
use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Subcategory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => $this->faker->word,
            'description' => $this->faker->text,
            'price' => $this->faker->randomFloat(2, 1, 1000),
            'id_subcategory' => Subcategory::factory()->create()->id,
            'size' => $this->faker->randomElement(['S', 'M', 'L']),
            'color' => $this->faker->safeColorName,
            'available_quantity' => $this->faker->numberBetween(0, 100),
            'img' => $this->faker->imageUrl(),
        ];
    }
}
