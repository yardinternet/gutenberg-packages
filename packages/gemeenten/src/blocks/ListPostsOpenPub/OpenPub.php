<?php

namespace Yard\Blocks\GemeentenBlocks\ListPostsOpenPub;

use Illuminate\Support\Collection;

class OpenPub
{
    /**
     * @var Collection
     */
    protected $attributes;

    /**
     * @param array $attributes
     */
    public function __construct(array $attributes)
    {
        $this->attributes = collect($attributes);
    }

    /**
     * @return Collection
     */
    public function getPosts(): Collection
    {
        $posts = app()->make('openpub.items')->query($this->buildQuery());

        if (!$this->stickyPost()) {
            return $posts;
        }

        $posts->prepend($this->stickyPost())->pop();

        return $posts;
    }

    /**
     * @return array
     */
    protected function buildQuery(): array
    {
        if (empty($this->selectedTerms())) {
            return [
                'limit' => $this->postsToShow(),
            ];
        }

        return [
            'limit' => $this->postsToShow(),
            'tax_query' => [
                [
                    'taxonomy' => 'openpub-type',
                    'field' => 'slug',
                    'terms' => $this->selectedTerms(),
                ],
            ],
        ];
    }

    /**
     * @return int
     */
    protected function postsToShow(): int
    {
        return !empty($this->attributes['postsToShow']) ? (int) $this->attributes['postsToShow'] : 6;
    }

    /**
     * @return array
     */
    protected function selectedTerms(): array
    {
        if (empty($this->attributes['selectedTerms'])) {
            return [];
        }

        return collect($this->attributes['selectedTerms'])
            ->map(function ($term) {
                return $term['value'];
            })
            ->toArray();
    }

    /**
     * @return ItemEntity|false
     */
    protected function stickyPost()
    {
        if (!$this->attributes['stickyPostSelection'] || empty($this->attributes['selectedStickyPostID'])) {
            return false;
        }

        $id = $this->attributes['selectedStickyPostID'];

        return app()->make('openpub.items')->find($id);
    }
}
