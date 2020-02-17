<?php

namespace Yard\Blocks\GemeentenBlocks\ListPostsOpenPub;

require_once 'OpenPub.php';

class ListPostsOpenPub
{

    protected $attributes = [
        'selectedTerms' => [
            'type' => 'array',
            'default' => [],
            'items' => [
                'type' => 'object'
            ]
        ],
        'stickyPostSelection' => [
            'type' => 'boolean',
            'default' => false,
        ],
        'selectedStickyPostID' => [
            'type' => 'number',
        ],
        'postsToShow' => [
            'type' => 'number',
            'default' => 6,
        ],
        'customID' => [
            'type' => 'string',
            'default' => '',
        ],
        'postType' => [
            'type' => 'string',
        ],
        'customSelection' => [
            'type' => 'boolean',
            'default' => false,
        ],
        'className' => [
            'type' => 'string',
        ],
        'styleClass' => [
            'type' => 'string',
            'default' => '',
        ],
        'customView' => [
            'type' => 'string',
            'default' => '',
        ],
        'taxonomyTerms' => [
            'type' => 'object',
            'default' => [],
            'items' => [
                'type' => 'object',
            ],
        ],
        'selectedPosts' => [
            'type' => 'array',
            'default' => [],
            'items' => [
                'type' => 'object',
            ],
        ],
        'excludedPosts' => [
            'type' => 'array',
            'default' => [],
            'items' => [
                'type' => 'object',
            ],
        ],
        'order' => [
            'type' => 'string',
            'default' => 'date',
        ],
        'orderBy' => [
            'type' => 'string',
            'default' => 'desc',
        ],
        'postsOffset' => [
            'type' => 'number',
            'default' => 0,
        ],
        'displayDate' => [
            'type' => 'boolean',
            'default' => true,
        ],
        'displayExcerpt' => [
            'type' => 'boolean',
            'default' => true,
        ],
        'displayFeaturedImage' => [
            'type' => 'boolean',
            'default' => true,
        ],
        'numberPerRow' => [
            'type' => 'number',
            'default' => 0,
        ],
        'numberPerRowSm' => [
            'type' => 'number',
            'default' => 0,
        ],
        'numberPerRowXs' => [
            'type' => 'number',
            'default' => 0,
        ],
    ];

    /*
    * Register block serverside
    */
    public function __construct()
    {
        add_action('init', function () {
            register_block_type('gemeenten/list-posts-openpub', [
                'render_callback' => [$this, 'render'],
                'attributes' => $this->attributes,
            ]);
        });
    }

    /**
     * @param array $attributes
     * @param array $content
     * @return string
     */
    public function render($attributes, $content)
    {
        $posts = (new OpenPub($attributes))->getPosts();

        return view('blocks.ListPostsOpenPub.index', ['attributes' => $attributes, 'posts' => $posts]);
    }
}
