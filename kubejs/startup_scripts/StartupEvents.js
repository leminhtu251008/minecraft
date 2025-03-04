StartupEvents.registry('item', event => {
    event
        .create('void_diamond_heart', "basic")
        .tooltip("Whenever you execute an Ender Guardian, there is a chance to obtain this item. Used for crafting Ultimated Weapons")
        .displayName('§5Void Diamond Heart')
        .maxStackSize(16)
        .glow(true)

    event
        .create('lava_diamond_heart', "basic")
        .tooltip("Whenever you execute a Monstrosity, there is a chance to obtain this item. Used for crafting Ultimated Weapons")
        .displayName('§4Lava Diamond Heart')
        .maxStackSize(16)
        .glow(true)

    event
        .create('abyssal_eye', "basic")
        .tooltip("Whenever you execute a Leviathan, there is a chance to obtain this item. Used for crafting Ultimated Weapons")
        .displayName('§dAbyssal Eye')
        .maxStackSize(16)
        .glow(true)

    event
        .create('bone_soul', "basic")
        .tooltip("Whenever you execute a Lich, there is a chance to obtain this item. Used for crafting Ultimated Weapons")
        .displayName('§7Bone Soul')
        .maxStackSize(16)
        .glow(true)

    event
        .create('toxin_cloud', "basic")
        .tooltip("Escape the Blue Skies. Don't forget to bring this one to home!")
        .displayName('§cToxin Cloud')
        .maxStackSize(16)
        .glow(true)

    event
        .create('dragon_special', "basic")
        .tooltip("FOR DRINK?")
        .displayName('§cDragon Special')
        .maxStackSize(16)
        .glow(true)

    event
        .create('absolute_smithing_template', "basic")
        .tooltip("The template for ultimate weapon smithing. Got from various bosses of Bossominium.")
        .displayName('§cAbsolute Smithing Template')
        .maxStackSize(64)
        .glow(true)
    
    event
        .create('infernal_skull', "basic")
        .tooltip("Peace or Chaos for Aerial Land?")
        .displayName('§cInfernal Skull')
        .maxStackSize(16)
        .glow(true)

    event
        .create('summoner_champion', "basic")
        .tooltip("Used to be a winner of a tournament! But now ....! Requires [Charoite Gears + Charoite Sword] to achieve.")
        .displayName('§cSummoner Champion Cup')
        .maxStackSize(16)
        .glow(true)

    event
        .create('alchemist_bottle', "basic")
        .tooltip("Every alchemist needs this. So, why don't take it too? Requires [Charoite Gears + Charoite Sword] to achieve.")
        .displayName('§cAlchemist Bottle')
        .maxStackSize(16)
        .glow(true)

    event
        .create('stellaris', "basic")
        .tooltip("Stand still Stellaris! Starlit want it! Requires [Diopside Gears + Diopside Axe] to achieve.")
        .displayName('§cStellaris')
        .maxStackSize(16)
        .glow(true)

    event
        .create('spider_artifact', "basic")
        .tooltip("Drop from Arachnarch. Requires [Diopside Gears + Different Sword] to achieve.")
        .displayName('§cSpider Artifact')
        .maxStackSize(16)
        .glow(true)
})
